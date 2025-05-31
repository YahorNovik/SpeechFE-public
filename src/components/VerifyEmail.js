import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying');
  const location = useLocation();
  const navigate = useNavigate();
  
// In VerifyEmail.js
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    
    console.log("Token received:", token);
    
    if (!token) {
      setStatus('invalid');
      return;
    }
    
    // Make a direct API call to verify token
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-email?token=${token}`)
      .then(response => {
        console.log("Verification response status:", response.status);
        if (response.ok) {
          window.location.href = '/email-verified';
        } else {
          setStatus('error');
          console.error("Verification failed");
        }
      })
      .catch(error => {
        console.error("Verification error:", error);
        setStatus('error');
      });
  }, [location]);
  
  return (
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
        maxWidth: '500px',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        {status === 'verifying' && (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
              Verifying your email...
            </h2>
            <p style={{ color: '#4B5563', marginBottom: '24px' }}>
              Please wait while we verify your email address.
            </p>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              margin: '0 auto',
              border: '4px solid #E5E7EB',
              borderTopColor: '#4F46E5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>
              {`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
          </>
        )}
        
        {status === 'invalid' && (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#B91C1C' }}>
              Invalid Verification Link
            </h2>
            <p style={{ color: '#4B5563', marginBottom: '24px' }}>
              The verification link appears to be invalid. Please request a new verification email.
            </p>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Back to Login
            </button>
          </>
        )}
        
        {status === 'error' && (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#B91C1C' }}>
              Verification Failed
            </h2>
            <p style={{ color: '#4B5563', marginBottom: '24px' }}>
              We encountered an issue verifying your email. Please try again or contact support.
            </p>
            <button 
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;