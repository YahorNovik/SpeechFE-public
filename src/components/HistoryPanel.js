import React, { useState, useEffect, useCallback } from 'react';

export default function HistoryPanel({ userToken }) {
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedIds, setExpandedIds] = useState(['first']);  
  const [showHistory, setShowHistory] = useState(false); 

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/grammar/history`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      
      const data = await response.json();
      setAnalysisHistory(data.analyses);
    } catch (err) {
      setError('Error loading history: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const deleteAnalysis = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/grammar/analysis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      if (response.ok) {
        setAnalysisHistory(analysisHistory.filter(analysis => analysis._id !== id));
      }
    } catch (err) {
      setError('Error deleting analysis: ' + err.message);
    }
  };

  const toggleExpand = (id, isFirst = false) => {
    if (isFirst) {
      // If it's the first item
      if (expandedIds.includes('first')) {
        setExpandedIds(expandedIds.filter(expandedId => expandedId !== 'first'));
      } else {
        setExpandedIds([...expandedIds, 'first']);
      }
    } else {
      // For other items
      if (expandedIds.includes(id)) {
        setExpandedIds(expandedIds.filter(expandedId => expandedId !== id));
      } else {
        setExpandedIds([...expandedIds, id]);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  };
   
  return (
    <>
      {/* History Button */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '16px'
      }}>
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{
            padding: '12px 24px',
            backgroundColor: showHistory ? '#EF4444' : '#3B82F6',
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
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>
   
      {/* History Panel Content */}
      {showHistory && (
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {/* Header section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Analysis History</h3>
            <button
              onClick={fetchHistory}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Refresh
            </button>
          </div>
   
          {/* Analysis items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {analysisHistory?.map((analysis, index) => (
              <div 
                key={analysis._id} 
                style={{
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => toggleExpand(analysis._id, index === 0)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    color: '#6B7280',
                    fontSize: '14px'
                  }}>
                    {formatDate(analysis.created_at)}
                  </div>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAnalysis(analysis._id);
                    }}
                    style={{
                      color: '#EF4444',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </span>
                </div>
   
                {(expandedIds.includes(analysis._id) || (index === 0 && expandedIds.includes('first'))) && 
  analysis.corrections && (
  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {analysis.corrections.includes('\n\nORIGINAL:') ? 
      // Multiple corrections
      analysis.corrections.split('\n\nORIGINAL:').map((block, blockIndex) => {
        if (!block.trim() || blockIndex === 0) return null;
        
        const parts = ('ORIGINAL: ' + block).split('\n');
        let original = '';
        let correction = '';
        let explanation = '';

        parts.forEach(part => {
          if (part.startsWith('ORIGINAL:')) original = part.replace('ORIGINAL:', '').trim();
          if (part.startsWith('CORRECTION:')) correction = part.replace('CORRECTION:', '').trim();
          if (part.startsWith('EXPLANATION:')) explanation = part.replace('EXPLANATION:', '').trim();
        });

        return (
          <div key={blockIndex} style={{ 
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div>
              <div style={{ color: '#991B1B', fontWeight: '600', marginBottom: '8px' }}>Original:</div>
              <div style={{ marginBottom: '16px' }}>{original}</div>
            </div>

            <div>
              <div style={{ color: '#059669', fontWeight: '600', marginBottom: '8px' }}>Correction:</div>
              <div style={{ marginBottom: '16px' }}>{correction}</div>
            </div>

            <div>
              <div style={{ color: '#2563EB', fontWeight: '600', marginBottom: '8px' }}>Explanation:</div>
              <div>{explanation}</div>
            </div>
          </div>
        );
      })
      :
      // Single correction
      (() => {
        const parts = analysis.corrections.split('\n');
        let original = '';
        let correction = '';
        let explanation = '';

        parts.forEach(part => {
          if (part.startsWith('ORIGINAL:')) original = part.replace('ORIGINAL:', '').trim();
          if (part.startsWith('CORRECTION:')) correction = part.replace('CORRECTION:', '').trim();
          if (part.startsWith('EXPLANATION:')) explanation = part.replace('EXPLANATION:', '').trim();
        });

        return (
          <div style={{ 
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div>
              <div style={{ color: '#991B1B', fontWeight: '600', marginBottom: '8px' }}>Original:</div>
              <div style={{ marginBottom: '16px' }}>{original}</div>
            </div>

            <div>
              <div style={{ color: '#059669', fontWeight: '600', marginBottom: '8px' }}>Correction:</div>
              <div style={{ marginBottom: '16px' }}>{correction}</div>
            </div>

            <div>
              <div style={{ color: '#2563EB', fontWeight: '600', marginBottom: '8px' }}>Explanation:</div>
              <div>{explanation}</div>
            </div>
          </div>
        );
      })()
    }
  </div>
)}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
   );
   }