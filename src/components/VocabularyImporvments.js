import React, { useState } from 'react';

const VocabularyImprovements = ({ transcription, userToken }) => {
  const [improvements, setImprovements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVocabularyImprovements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vocabulary/improve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ text: transcription })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to get vocabulary improvements');
      }

      setImprovements(data);
    } catch (err) {
      console.error('Vocabulary improvement error:', err);
      setError(err.message || 'Failed to get vocabulary improvements');
    } finally {
      setLoading(false);
    }
  };

  if (!transcription) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#111827'
        }}>
          Vocabulary Improvements
        </h3>
        <button
          onClick={getVocabularyImprovements}
          disabled={loading || !transcription}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading || !transcription ? 'not-allowed' : 'pointer',
            opacity: loading || !transcription ? 0.7 : 1
          }}
        >
          {loading ? 'Analyzing...' : 'Get Suggestions'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#FEE2E2',
          border: '1px solid #EF4444',
          borderRadius: '6px',
          color: '#B91C1C',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      {improvements && improvements.vocabulary_improvements && improvements.vocabulary_improvements.length > 0 ? (
        improvements.vocabulary_improvements.map((improvement, index) => (
          <div
            key={index}
            style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '6px',
              marginBottom: '12px'
            }}
          >
            <div style={{ 
              fontWeight: '500', 
              color: '#4B5563',
              marginBottom: '8px' 
            }}>
              Original: "{improvement.original}"
            </div>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontWeight: '500', color: '#059669' }}>Suggestions: </span>
              {improvement.suggestions.join(', ')}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>
              {improvement.context}
            </div>
          </div>
        ))
      ) : improvements ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#6B7280',
          padding: '20px' 
        }}>
          No improvements suggested for this text
        </div>
      ) : !loading && (
        <div style={{ 
          textAlign: 'center', 
          color: '#6B7280',
          padding: '20px' 
        }}>
          Click "Get Suggestions" to analyze your vocabulary
        </div>
      )}
    </div>
  );
};

export default VocabularyImprovements;