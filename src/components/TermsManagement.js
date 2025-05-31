import React, { useState, useEffect, useCallback } from 'react';

export default function TermsManagement({ userToken }) {
  const [terms, setTerms] = useState([]);
  const [newTerm, setNewTerm] = useState({ wrong: '', correct: '', description: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchTerms = useCallback(async () => {
    if (!userToken) return;
  
    setIsLoading(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/terms/`.replace(/([^:]\/)\/+/g, "$1"); // Ensures proper URL format
  
      const response = await fetch(apiUrl, {
        headers: { 
          'Authorization': `Bearer ${userToken}` 
        },
        redirect: 'follow', // Ensures fetch follows redirects
      });
  
      console.log("Final request URL:", response.url); // Debugging log
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setTerms(Array.isArray(data.terms) ? data.terms : []);
    } catch (err) {
      setError('Error loading terms: ' + err.message);
      setTerms([]);
    } finally {
      setIsLoading(false);
    }
  }, [userToken]);
  

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      // Ensure the API URL uses HTTPS and doesn't cause unnecessary redirects
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/terms/`.replace(/([^:]\/)\/+/g, "$1");
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(newTerm),
        redirect: 'follow',  // Ensure fetch follows redirects
      });
  
      console.log("Final POST request URL:", response.url); // Debugging log
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add term');
      }
  
      setNewTerm({ wrong: '', correct: '', description: '' });
      fetchTerms(); // Refresh terms list after adding a new one
    } catch (err) {
      setError('Error adding term: ' + err.message);
    }
  };
  

  const deleteTerm = async (termId) => {
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/terms/${termId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete term');
      }

      fetchTerms(); // Call fetchTerms after deleting a term
    } catch (err) {
      setError('Error deleting term: ' + err.message);
    }
  };


  return (
    <div style={{ marginTop: '24px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Custom Terms</h3>
      <p style={{ 
    fontSize: '14px', 
    color: '#4B5563', 
    marginBottom: '16px',
    padding: '8px 12px',
    backgroundColor: '#F3F4F6',
    borderRadius: '6px',
    borderLeft: '3px solid #3B82F6'
  }}>
    Add specialized terms to improve transcription accuracy. AI models sometimes struggle with technical terminology, acronyms, or industry-specific language.
  </p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
  <div style={{ 
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    alignItems: 'center'
  }}>
    <input
      type="text"
      placeholder="Wrong term"
      value={newTerm.wrong}
      onChange={(e) => setNewTerm({ ...newTerm, wrong: e.target.value })}
      style={{
        padding: '8px 12px',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        flex: 1 // Takes equal space
      }}
      required
    />
    <input
      type="text"
      placeholder="Correct term"
      value={newTerm.correct}
      onChange={(e) => setNewTerm({ ...newTerm, correct: e.target.value })}
      style={{
        padding: '8px 12px',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        flex: 1 // Takes equal space
      }}
      required
    />
    <input
      type="text"
      placeholder="Description (optional)"
      value={newTerm.description}
      onChange={(e) => setNewTerm({ ...newTerm, description: e.target.value })}
      style={{
        padding: '8px 12px',
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        flex: 2, // Takes space equal to Wrong + Correct Term
      }}
    />
  </div>

  <button
    type="submit"
    style={{
      padding: '8px 16px',
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }}
  >
    Add Term
  </button>
</form>

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

      {isLoading ? (
        <div style={{ textAlign: 'center', color: '#6B7280', padding: '16px 0' }}>
          Loading terms...
        </div>
      ) : terms.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#6B7280', padding: '16px 0' }}>
          No terms added yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {terms.map((term) => (
            <div
              key={term._id}
              style={{
                padding: '12px',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: '500' }}>
                  {term.wrong} → {term.correct}
                </div>
                {term.description && (
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    {term.description}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteTerm(term._id)}
                style={{
                  padding: '4px 8px',
                  color: '#EF4444',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
