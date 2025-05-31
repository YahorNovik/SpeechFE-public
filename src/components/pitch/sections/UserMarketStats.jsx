const UserMarketStats = () => {
    const items = [
      {
        target: {
          text: 'International students',
          icon: '🎓'
        },
        market: {
          text: 'Global English Learning Market: $31.5B (2020)',
          icon: '📈'
        }
      },
      {
        target: {
          text: 'Business professionals',
          icon: '💼'
        },
        market: {
          text: 'Expected to reach $54.92B by 2027',
          icon: '💹'
        }
      },
      {
        target: {
          text: 'Language learners',
          icon: '📚'
        }, 
        market: {
          text: '1.5B English language learners worldwide',
          icon: '🌎'
        }
      },
      {
        target: {
          text: 'ESL teachers and institutions',
          icon: '👩‍🏫'
        },
        market: {
          text: 'Growing demand for online learning solutions',
          icon: '📱'
        }
      },
      {
        target: {
          text: 'Corporate training programs',
          icon: '🏢'
        },
        market: {
          text: 'Increasing need for professional English skills',
          icon: '📊'
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
        {/* Target Users Column */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            Target Users
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {items.map((item, index) => (
              <div
                key={`target-${index}`}
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
                <span style={{ fontSize: '24px' }}>{item.target.icon}</span>
                <p style={{ margin: 0, fontSize: '16px' }}>{item.target.text}</p>
              </div>
            ))}
          </div>
        </div>
   
        {/* Market Size Column */}
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            Market Size
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {items.map((item, index) => (
              <div
                key={`market-${index}`}
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
                <span style={{ fontSize: '24px' }}>{item.market.icon}</span>
                <p style={{ margin: 0, fontSize: '16px' }}>{item.market.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
   };
   
   export default UserMarketStats;