import React, { useState, useRef, useEffect } from 'react';
import TermsManagement from './TermsManagement';

export default function TranscriptionForm({ onTranscriptionComplete, userToken, onTimeUpdate }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const durationIntervalRef = useRef(null);
  const [showDurationExceededPopup, setShowDurationExceededPopup] = useState(false);
  const [remainingTimeValue, setRemainingTimeValue] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // Debug popup visibility
  useEffect(() => {
    if (showDurationExceededPopup) {
      console.log("Showing duration exceeded popup");
      console.log("Recording duration:", recordingDuration);
      console.log("Remaining time value:", remainingTimeValue);
    }
  }, [showDurationExceededPopup, recordingDuration, remainingTimeValue]);

  const formatTime = (seconds) => {
    // Convert seconds to a number if it's a string
    const secs = typeof seconds === 'string' ? parseFloat(seconds) : seconds;
    
    // Handle decimal seconds
    const totalSeconds = Math.floor(secs);
    const mins = Math.floor(totalSeconds / 60);
    const remainingSecs = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    
    return `${mins}:${remainingSecs}`;
  };

  const startRecording = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      // Reset and start tracking duration
      setRecordingDuration(0);
      let startTime = Date.now();
      durationIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setRecordingDuration(elapsed);
      }, 1000);
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus('recording');
    } catch (err) {
      setError('Error accessing microphone: ' + err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear the duration interval
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await handleTranscription(blob);
        chunksRef.current = [];
      };
    }
  };

  const handleTranscription = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('duration', recordingDuration.toString());

    try {
      setStatus('transcribing');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transcription/transcribe`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
        body: formData,
      });

      // Replace your current error handling with this simpler approach
      if (!response.ok) {
        if (response.status === 400) {
          const errorText = await response.text();
          console.log("Error response text:", errorText);
          
          try {
            const errorData = JSON.parse(errorText);
            console.log("Parsed outer error data:", errorData);
            
            // Check if we have a message that looks like a Python dict
            if (errorData.message && typeof errorData.message === 'string' && 
                errorData.message.includes('remainingTime')) {
              
              // Try to parse the inner message string
              // First convert Python-style to JSON format
              const cleanedMessage = errorData.message
                .replace(/'/g, '"')        // Replace single quotes with double quotes
                .replace(/(\w+):/g, '"$1":'); // Add quotes around keys
              
              try {
                const innerData = JSON.parse(cleanedMessage);
                console.log("Parsed inner message:", innerData);
                
                if (innerData.remainingTime !== undefined) {
                  setRemainingTimeValue(innerData.remainingTime);
                  setShowDurationExceededPopup(true);
                  setStatus('idle');
                  return;
                }
              } catch (innerJsonError) {
                console.log("Error parsing inner message:", innerJsonError);
              }
            }
            
            // If we get here, fallback to showing the error message directly
            throw new Error(errorData.message || `Server returned ${response.status}`);
          } catch (jsonError) {
            console.log("Error parsing JSON:", jsonError);
            throw new Error(`Server returned ${response.status}: ${errorText}`);
          }
        } else {
          // Other status codes
          throw new Error(`Server returned ${response.status}`);
        }
      }

      const data = await response.json();
      const result = await pollTranscriptionStatus(data.job_id);
      
      setStatus('analyzing');
      const grammarResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/grammar/analyze`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ text: result.text })
      });
      
      const grammarData = await grammarResponse.json();
      
      onTranscriptionComplete({ 
        transcription: result.text, 
        grammar: grammarData.data 
      });
      setStatus('completed');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const pollTranscriptionStatus = async (jobId) => {
    while (true) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/transcription/status/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        }
      );
      const data = await response.json();
      
      if (data.status === 'completed') {
        if (data.remaining_time !== undefined) {
          onTimeUpdate(data.remaining_time);
        }
        return data;
      }
      if (data.status === 'failed') {
        throw new Error(data.error);
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  };

  const DurationExceededPopup = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#EF4444',
          marginBottom: '16px'
        }}>Recording Too Long</h3>
        
        <p style={{ marginBottom: '16px', color: '#4B5563' }}>
          Your recording duration ({formatTime(recordingDuration)}) exceeds your remaining time ({formatTime(remainingTimeValue)}).
        </p>
        
        <p style={{ marginBottom: '24px', color: '#4B5563' }}>
          Please record a shorter clip or add more time to your account.
        </p>
        
        <button
          onClick={() => setShowDurationExceededPopup(false)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              padding: '12px 24px',
              backgroundColor: isRecording ? '#EF4444' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isRecording ? (
              <>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'white',
                  borderRadius: '50%'
                }} />
                Stop Recording
              </>
            ) : (
              'Start Recording'
            )}
          </button>

          <button
            onClick={() => setShowTerms(!showTerms)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#3B82F6',
              border: '1px solid #3B82F6',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Manage Terms
          </button>
        </div>

        {isRecording && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#EF4444',
            fontSize: '16px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#EF4444',
              borderRadius: '50%',
              animation: 'pulse 1.5s infinite'
            }} />
            {formatTime(recordingTime)}
          </div>
        )}
      </div>

      {/* Status and Error Messages */}
      {status !== 'idle' && status !== 'completed' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#6B7280',
          fontSize: '14px',
          marginTop: '16px'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #3B82F6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          {status === 'transcribing' ? 'Transcribing...' : 'Analyzing grammar...'}
        </div>
      )}

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#FEE2E2',
          border: '1px solid #EF4444',
          borderRadius: '6px',
          color: '#B91C1C',
          fontSize: '14px',
          marginTop: '16px'
        }}>
          {error}
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {showTerms && <TermsManagement userToken={userToken} />}
      
      {/* Duration Exceeded Popup */}
      {showDurationExceededPopup && <DurationExceededPopup />}
    </div>
  );
}