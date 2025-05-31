const HeroSection = () => {
  return (
    <div style={{
      marginBottom: '50px',
      paddingTop: '40px'
    }}>
      {/* Title moved outside */}
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '40px',  // Increased margin to create space
        color: '#111827'
      }}>
        Turn Your Meetings into Learning Opportunities
      </h2>

      {/* White boxes for descriptions */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        borderLeft: '4px solid #4F46E5',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <p style={{
          fontSize: '18px',
          color: '#333',
          lineHeight: '1.6'
        }}>
          A powerful tool for business professionals to improve their English communication skills by analyzing their real-world conversations and meetings.
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        borderLeft: '4px solid #818CF8',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <p style={{
          fontSize: '18px',
          color: '#333',
          lineHeight: '1.6'
        }}>
          Record your business meetings, presentations, or practice sessions and receive personalized grammar analysis and targeted recommendations for improvement in your professional context.
        </p>
      </div>
  
        {/* Feature Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginTop: '16px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#4F46E5', fontSize: '20px' }}>✓</span>
            <span style={{ color: '#4B5563', fontWeight: '500' }}>Real business context</span>
          </div>
  
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#4F46E5', fontSize: '20px' }}>✓</span>
            <span style={{ color: '#4B5563', fontWeight: '500' }}>Personalized feedback</span>
          </div>
  
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#4F46E5', fontSize: '20px' }}>✓</span>
            <span style={{ color: '#4B5563', fontWeight: '500' }}>Progress tracking</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;