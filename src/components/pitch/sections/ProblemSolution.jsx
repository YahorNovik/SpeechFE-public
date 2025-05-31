const ProblemSolution = () => {
    const items = [
      {
        problem: {
          text: 'Non-native speakers struggle with spoken English grammar',
          icon: '🗣️'
        },
        solution: {
          text: 'Real-time speech-to-text transcription',
          icon: '📝'
        }
      },
      {
        problem: {
          text: 'Limited real-time feedback during speech practice',
          icon: '⏱️'
        },
        solution: {
          text: 'Instant grammar analysis and corrections',
          icon: '✓'
        }
      },
      {
        problem: {
          text: 'Traditional language learning lacks immediate correction',
          icon: '📚'
        },
        solution: {
          text: 'Personalized learning recommendations',
          icon: '🎯'
        }
      },
      {
        problem: {
          text: 'Expensive private tutoring',
          icon: '💰'
        },
        solution: {
          text: 'Accessible practice environment',
          icon: '💻'
        }
      }
    ];
  
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '60px',
        padding: '20px'
      }}>
        {/* Problem Column */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            The Problem
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {items.map((item, index) => (
              <div
                key={`problem-${index}`}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <span style={{ fontSize: '24px' }}>{item.problem.icon}</span>
                <p style={{ margin: 0, fontSize: '16px' }}>{item.problem.text}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Solution Column */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            Our Solution
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {items.map((item, index) => (
              <div
                key={`solution-${index}`}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <span style={{ fontSize: '24px' }}>{item.solution.icon}</span>
                <p style={{ margin: 0, fontSize: '16px' }}>{item.solution.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProblemSolution;