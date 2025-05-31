// src/components/pitch/sections/TechnologyStack.jsx
const TechnologyStack = () => {
  const technologies = {
    core: [
      {
        name: 'React.js',
        description: 'Modern UI/UX development',
        color: '#61DAFB',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
          </svg>
        )
      },
      {
        name: 'FastAPI',
        description: 'High-performance Python backend',
        color: '#009688',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M20.229 15.793a.666.666 0 0 0-.101-.57l-3.03-3.03a.666.666 0 0 0-.57-.101l-2.697.674a.666.666 0 0 0-.479.479l-.674 2.697c-.051.2.007.413.101.57l3.03 3.03c.157.094.37.152.57.101l2.697-.674a.666.666 0 0 0 .479-.479l.674-2.697zM8.05 8.05c1.162-1.162 3.115-1.011 4.478.352 1.364 1.364 1.515 3.316.352 4.478-1.162 1.162-3.115 1.011-4.478-.352-1.364-1.364-1.515-3.316-.352-4.478z" />
          </svg>
        )
      },
      // Add more core technologies...
    ],
    ai: [
      {
        name: 'Whisper',
        description: 'Advanced speech recognition',
        color: '#4CAF50',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        )
      },
      {
        name: 'OpenAI',
        description: 'Grammar analysis engine',
        color: '#2196F3',
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        )
      },
      // Add more AI technologies...
    ]
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', gap: '60px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '40px'
          }}>
            Core Technologies
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            {technologies.core.map((tech, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: `2px solid ${tech.color}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  backgroundColor: tech.color,
                  padding: '12px',
                  borderRadius: '12px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tech.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {tech.name}
                  </h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '40px'
          }}>
            AI Integration
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            {technologies.ai.map((tech, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: `2px solid ${tech.color}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  backgroundColor: tech.color,
                  padding: '12px',
                  borderRadius: '12px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tech.icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {tech.name}
                  </h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyStack;