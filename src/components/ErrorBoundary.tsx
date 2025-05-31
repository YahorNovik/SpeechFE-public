import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#FEE2E2',
        borderRadius: '8px',
        margin: '20px',
      }}
    >
      <h2 style={{ color: '#991B1B', marginBottom: '10px' }}>Something went wrong</h2>
      <pre style={{ color: '#B91C1C', marginBottom: '15px' }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{
          backgroundColor: '#DC2626',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
};

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};