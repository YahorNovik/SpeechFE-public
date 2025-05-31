import React from 'react';

const ProcessFlow = () => {
  const steps = [
    { title: "Speech Input", subtitle: "Record your speech" },
    { title: "Transcription", subtitle: "AI Speech-to-Text" },
    { title: "Analysis", subtitle: "Grammar Check" },
    { title: "Results", subtitle: "Improvements" }
  ];

  return (
    <div style={{ width: '100%', textAlign: 'center', padding: '20px 0' }}>
      {/* Process Flow Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '40px'
      }}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Box */}
            <div style={{
              background: '#818CF8',
              color: 'white',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center',
              width: '250px'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '16px', opacity: '0.9' }}>
                {step.subtitle}
              </div>
            </div>

            {/* Arrow (except after last step) */}
            {index < steps.length - 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 10px'
              }}>
                <div style={{
                  width: '80px',
                  height: '2px',
                  backgroundColor: '#666',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '-1px',
                    top: '-4px',
                    width: '10px',
                    height: '10px',
                    borderTop: '2px solid #666',
                    borderRight: '2px solid #666',
                    transform: 'rotate(45deg)'
                  }} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Screenshot Section */}
      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        padding: '20px',
        background: '#F4F4F5',
        borderRadius: '12px',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <img 
          src="/flow.png" 
          alt="Speech Grammar Assistant Screenshot" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default ProcessFlow;
