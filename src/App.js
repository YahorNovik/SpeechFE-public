import React, { useState, useEffect } from 'react';
import TranscriptionForm from './components/TranscriptionForm';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PitchDeck from './components/pitch/PitchDeck';
import HistoryPanel from './components/HistoryPanel';
import CookieConsent from './components/CookieConsent';
import CookiePolicy from './components/CookiePolicy';
import VocabularyImprovements from './components/VocabularyImporvments';
import EmailVerified from './components/EmailVerified';
import EmailAlreadyVerified from './components/EmailAlreadyVerified';
import VerifyEmail from './components/VerifyEmail';

const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 15;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [grammarAnalysis, setGrammarAnalysis] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showVocabulary, setShowVocabulary] = useState(false);
  let durationInterval = null;

  const handleLoginClick = () => {
    setShowLanding(false);
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLanding(false);
    setIsLogin(false);
  };

  const isMobile = useIsMobile();

    // Mobile-specific styles
  const mobileNavStyle = {
      padding: isMobile ? '12px' : '16px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '12px' : '16px'
    };
    
  const mobileButtonStyle = {
      padding: isMobile ? '12px 16px' : '8px 16px',
      fontSize: isMobile ? '16px' : '14px', 
      width: isMobile ? '100%' : 'auto'
    };

  // Token refresh logic
  useEffect(() => {
    const refreshToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/refresh`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('authToken', data.access_token);
          setRemainingTime(data.remaining_time);
          setEmailVerified(data.email_verified || false);
        } else {
          handleLogout();
        }
      } catch (err) {
        console.error('Token refresh error:', err);
        handleLogout();
      }
    };

    refreshToken(); // Initial refresh
    const intervalId = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  // Check for saved auth token on load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setRemainingTime(userData.remaining_time);
        setEmailVerified(userData.email_verified || false);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setAuthError('');
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });
  
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.access_token);
        setRemainingTime(data.user.remaining_time);
        setEmailVerified(data.user.email_verified || false);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.detail || 'Login failed');
      }
    } catch (err) {
      setAuthError('Failed to connect to server');
      console.error('Login error:', err);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      setAuthError('');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register?email=${email}&password=${password}`, {
        method: 'POST',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('authToken', data.access_token);
        setRemainingTime(data.user.remaining_time);
        setEmailVerified(data.user.email_verified || false);
        setIsAuthenticated(true);
        
        // Show verification notice if email was sent
        if (data.verification_email_sent) {
          setVerificationMessage('Registration successful! Please check your email to verify your account.');
        }
      } else if (data.detail) {
        const errorMessages = data.detail.map((error) => error.msg);
        setAuthError(errorMessages.join(', '));
      } else {
        setAuthError('Registration failed.');
      }
    } catch (err) {
      setAuthError('Failed to connect to server');
      console.error('Registration error:', err);
    }
  };

  const handleResendVerification = async () => {
    setIsResendingVerification(true);
    setVerificationMessage('');
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setVerificationMessage('Verification email sent! Please check your inbox.');
      } else {
        const data = await response.json();
        setVerificationMessage(data.detail || 'Failed to send verification email. Please try again later.');
      }
    } catch (err) {
      setVerificationMessage('Failed to connect to server');
      console.error('Resend verification error:', err);
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setTranscription('');
    setGrammarAnalysis(null);
    setEmailVerified(false);
  };

  const handleTimeUpdate = (newTime) => {
    setRemainingTime(newTime);
  };

  const handleTranscriptionComplete = (result) => {
    setTranscription(result.transcription);
    setGrammarAnalysis(result.grammar);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (isLogin) {
      await handleLogin(email, password);
    } else {
      await handleRegister(email, password);
    }
  };

  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}> 
    <Routes>
      {/* Make pitch route available for all users */}
      <Route path="/pitch" element={<PitchDeck />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} /> 
      
      {/* Email verification routes */}
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/email-verified" element={<EmailVerified />} />
      <Route path="/email-already-verified" element={<EmailAlreadyVerified />} />
      
      <Route path="/" element={
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          {showLanding && !isAuthenticated ? (
            <LandingPage onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
          ) : !isAuthenticated ? (

        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#f3f4f6'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '360px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px 32px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '32px',
              color: '#111827'
            }}>
              {isLogin ? 'Login' : 'Register'}
            </h2>
  
            {authError && typeof authError === 'string' && (
              <div style={{
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: '#FEE2E2',
                borderLeft: '4px solid #EF4444',
                color: '#B91C1C'
              }}>
                {authError}
              </div>
            )}
            
            {verificationMessage && (
              <div style={{
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: '#DEF7EC',
                borderLeft: '4px solid #10B981',
                color: '#065F46'
              }}>
                {verificationMessage}
              </div>
            )}
  
            <form onSubmit={handleAuth}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    outline: 'none',
                    fontSize: '16px',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                />
              </div>
    
              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    outline: 'none',
                    fontSize: '16px',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4338CA'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4F46E5'}
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
    
              {/* Toggle Between Login/Register */}
              <div style={{
                textAlign: 'center',
                marginTop: '16px',
                fontSize: '14px',
                color: '#6B7280'
              }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    color: '#4F46E5',
                    fontWeight: '500',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    textDecoration: 'underline'
                  }}
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          <nav style={{
            backgroundColor: 'white',
            padding: '16px',
            marginBottom: '32px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? '16px' : '0'
            }}>   
             <h1 style={{ 
              fontSize: isMobile ? '20px' : '24px', 
              fontWeight: 'bold', 
              color: '#111827',
              textAlign: isMobile ? 'center' : 'left'
            }}>
                Speech Grammar Assistant
              </h1>
  
              <div style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'stretch' : 'center', 
                  gap: '10px' 
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    color: '#4B5563', 
                    fontWeight: '500',
                    textAlign: isMobile ? 'center' : 'left'
                  }}>
                  Time remaining: {Math.floor((remainingTime ?? 0) / 60)}:
                  {String(Math.floor((remainingTime ?? 0) % 60)).padStart(2, '0')}
                </div>
                <button
                  onClick={() => setShowWelcome(true)}
                  style={{
                    ...mobileButtonStyle,
                    backgroundColor: '#4F46E5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Show Guide
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    ...mobileButtonStyle,
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
  
          <main style={{  maxWidth: '1200px',  margin: '0 auto', padding: isMobile ? '16px' : '0'}}>
            {/* Email Verification Banner */}
            {!emailVerified && (
              <div style={{
                backgroundColor: '#FEF3C7',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #F59E0B',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'stretch' : 'center',
                gap: isMobile ? '12px' : '0'
              }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400E', marginBottom: '4px' }}>
                    Email Verification Required
                  </h3>
                  <p style={{ fontSize: '14px', color: '#92400E' }}>
                    Please verify your email address to ensure full access to all features.
                  </p>
                  {verificationMessage && (
                    <p style={{ fontSize: '14px', color: '#059669', marginTop: '8px' }}>
                      {verificationMessage}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleResendVerification}
                  disabled={isResendingVerification}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: isResendingVerification ? 'default' : 'pointer',
                    opacity: isResendingVerification ? 0.7 : 1,
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  {isResendingVerification ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            )}

{showWelcome ? (
  <div style={{
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
      Welcome to Speech Grammar Assistant
    </h2>
    
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
        How it works:
      </h3>
      <ol style={{ paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}>Click the Record button when you're ready to speak</li>
        <li style={{ marginBottom: '10px' }}>Your speech will be automatically transcribed</li>
        <li style={{ marginBottom: '10px' }}>Receive instant grammar analysis and improvements</li>
        <li style={{ marginBottom: '10px' }}>Use headphones to ensure only your voice is captured clearly</li>
      </ol>
    </div>
    
    <button
      onClick={() => setShowWelcome(false)}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4F46E5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}
    >
      Get Started
    </button>
  </div>
) : remainingTime > 0 ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {/* Recording Controls */}
      <TranscriptionForm
        onTranscriptionComplete={handleTranscriptionComplete}
        userToken={localStorage.getItem('authToken')}
        onTimeUpdate={handleTimeUpdate}
      />

    {/* Transcription */}
    {transcription && (
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#111827',
          marginBottom: '16px'
        }}>
          Transcription
        </h3>
        <p style={{ 
          color: '#374151',
          fontSize: '16px',
          lineHeight: '1.6'
        }}>
          {transcription}
        </p>
      </div>
    )}

{grammarAnalysis && typeof grammarAnalysis === 'object' && (
  <div style={{
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }}>
    <h3 style={{ 
      fontSize: '20px', 
      fontWeight: '600', 
      color: '#111827',
      marginBottom: '16px'
    }}>
      Grammar Analysis
    </h3>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {grammarAnalysis.corrections?.includes('NO_ERRORS') ? (
        <div style={{
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB'
        }}>
          <span style={{ 
            fontSize: '16px', 
            fontWeight: '500', 
            color: '#059669' 
          }}>
            The provided text is grammatically correct.
          </span>
        </div>
      ) : (
        grammarAnalysis?.corrections?.split('ORIGINAL:').slice(1).map((errorBlock, index) => {
          const correctionPart = errorBlock.split('CORRECTION:');
          const explanationPart = correctionPart[1].split('EXPLANATION:');
        
          const originalText = correctionPart[0].trim();
          const correctionText = explanationPart[0].trim();
          
          // Enhanced difference finding with better word alignment
          const findDifferences = () => {
            const originalWords = originalText.split(/\s+/);
            const correctionWords = correctionText.split(/\s+/);
            
            const originalDiffs = [];
            const correctionDiffs = [];
            
            // Clean word function
            const cleanWord = (word) => word.replace(/[.,?!;:()'"]/g, '').toLowerCase();
            
            // Use dynamic programming for optimal alignment
            const m = originalWords.length;
            const n = correctionWords.length;
            
            // Create alignment matrix
            const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
            const trace = Array(m + 1).fill(null).map(() => Array(n + 1).fill(''));
            
            // Initialize base cases
            for (let i = 0; i <= m; i++) dp[i][0] = i;
            for (let j = 0; j <= n; j++) dp[0][j] = j;
            
            // Fill the matrix
            for (let i = 1; i <= m; i++) {
              for (let j = 1; j <= n; j++) {
                const origWord = cleanWord(originalWords[i - 1]);
                const corrWord = cleanWord(correctionWords[j - 1]);
                
                if (origWord === corrWord) {
                  dp[i][j] = dp[i - 1][j - 1];
                  trace[i][j] = 'match';
                } else {
                  const substitute = dp[i - 1][j - 1] + 1;
                  const insert = dp[i][j - 1] + 1;
                  const delete_ = dp[i - 1][j] + 1;
                  
                  if (substitute <= insert && substitute <= delete_) {
                    dp[i][j] = substitute;
                    trace[i][j] = 'substitute';
                  } else if (insert <= delete_) {
                    dp[i][j] = insert;
                    trace[i][j] = 'insert';
                  } else {
                    dp[i][j] = delete_;
                    trace[i][j] = 'delete';
                  }
                }
              }
            }
            
            // Backtrack to find operations
            let i = m, j = n;
            while (i > 0 || j > 0) {
              if (i > 0 && j > 0 && trace[i][j] === 'match') {
                i--;
                j--;
              } else if (i > 0 && j > 0 && trace[i][j] === 'substitute') {
                originalDiffs.unshift(originalWords[i - 1]);
                correctionDiffs.unshift(correctionWords[j - 1]);
                i--;
                j--;
              } else if (i > 0 && trace[i][j] === 'delete') {
                originalDiffs.unshift(originalWords[i - 1]);
                i--;
              } else if (j > 0) {
                correctionDiffs.unshift(correctionWords[j - 1]);
                j--;
              }
            }
            
            return { originalDiffs, correctionDiffs };
          };
          
          const { originalDiffs, correctionDiffs } = findDifferences();
          
          // Enhanced rendering with better highlighting
          const renderWithHighlight = (text, diffWords, color, isCorrection = false) => {
            const words = text.split(/(\s+)/);
            
            return words.map((word, i) => {
              // Skip whitespace tokens
              if (/^\s+$/.test(word)) {
                return <span key={i}>{word}</span>;
              }
              
              const cleanWord = word.replace(/[.,?!;:()'"]/g, '').toLowerCase();
              
              // Check if this word should be highlighted
              const shouldHighlight = diffWords.some(diff => {
                const cleanDiff = diff.replace(/[.,?!;:()'"]/g, '').toLowerCase();
                return cleanDiff === cleanWord;
              });
              
              if (shouldHighlight) {
                return (
                  <span 
                    key={i} 
                    style={{ 
                      color: color,
                      fontWeight: '600',
                      backgroundColor: isCorrection ? '#DCFCE7' : '#FEE2E2',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      border: `1px solid ${isCorrection ? '#10B981' : '#EF4444'}`,
                      margin: '0 1px'
                    }}
                  >
                    {word}
                  </span>
                );
              }
              
              return <span key={i}>{word}</span>;
            });
          };
        
          return (
            <div key={index} style={{
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FAFAFA'
            }}>
              <div style={{ 
                color: '#991B1B', 
                fontWeight: '600', 
                marginBottom: '8px',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Original:
              </div>
              <div style={{ 
                color: '#374151', 
                marginBottom: '20px',
                fontSize: '16px',
                lineHeight: '1.5',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #FEE2E2'
              }}>
                {renderWithHighlight(originalText, originalDiffs, '#EF4444', false)}
              </div>
        
              <div style={{ 
                color: '#059669', 
                fontWeight: '600', 
                marginBottom: '8px',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Correction:
              </div>
              <div style={{ 
                color: '#374151', 
                marginBottom: '20px',
                fontSize: '16px',
                lineHeight: '1.5',
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #DCFCE7'
              }}>
                {renderWithHighlight(correctionText, correctionDiffs, '#10B981', true)}
              </div>
        
              <div style={{ 
                color: '#2563EB', 
                fontWeight: '600', 
                marginBottom: '8px',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Explanation:
              </div>
              <div style={{ 
                color: '#374151',
                fontSize: '15px',
                lineHeight: '1.6',
                padding: '12px',
                backgroundColor: '#F8FAFC',
                borderRadius: '6px',
                fontStyle: 'italic'
              }}>
                {explanationPart[1].trim()}
              </div>
            </div>
          );
        })
      )}
    </div>

    {grammarAnalysis.recommendations && grammarAnalysis.recommendations.length > 0 && (
      <div style={{
        marginTop: '20px',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#F9FAFB'
      }}>
        <h4 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#111827',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>📚</span>
          Recommended Exercises
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {grammarAnalysis.recommendations.map((exercise, index) => (
            <a 
              key={index} 
              href={exercise.exercise_link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#3B82F6', 
                textDecoration: 'none', 
                fontSize: '16px',
                transition: 'all 0.2s ease',
                padding: '12px 16px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#2563EB';
                e.target.style.backgroundColor = '#EFF6FF';
                e.target.style.borderColor = '#3B82F6';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#3B82F6';
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#E5E7EB';
              }}
            >
              <span style={{ fontWeight: '500' }}>→</span> {exercise.rule_name}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
)}
{transcription && showVocabulary && (
  <VocabularyImprovements 
    transcription={transcription}
    userToken={localStorage.getItem('authToken')}
  />
)}
        {/* Analysis History */}
        <HistoryPanel userToken={localStorage.getItem('authToken')} />
  </div>
) : null}
          </main>
        </div>
      )}
    </div>
            } />
            </Routes>
            <CookieConsent />
            </div>
          </Router>
  );  
}

export default App;
