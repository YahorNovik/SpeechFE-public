// src/components/pitch/sections/GrowthStrategy.jsx
const GrowthStrategy = () => {
  const strategies = [
    {
      phase: "Phase 1: Market Entry",
      color: "#818CF8", // Indigo
      items: [
        "Free trial period",
        "Educational partnerships",
        "Social media presence",
        "User feedback integration"
      ]
    },
    {
      phase: "Phase 2: Growth",
      color: "#60A5FA", // Blue
      items: [
        "Desktop app launch",
        "Feature expansion",
        "Premium partnerships"
      ]
    },
    {
      phase: "Phase 3: Expansion",
      color: "#34D399", // Green
      items: [
        "International markets",
        "Enterprise solutions",
        "Additional languages"
      ]
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '40px'
      }}>
        Growth Strategy
      </h2>

      <div style={{ position: 'relative', minHeight: '300px' }}>
        {/* SVG Connection Lines */}
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Curved path connecting phases */}
          <path
            d="M 200,250 C 400,250 600,250 800,250"
            stroke="#E5E7EB"
            strokeWidth="4"
            fill="none"
          />
          
          {/* Direction arrows */}
          <path
            d="M 400,250 l 20,-10 l -20,20 l -20,-10 z"
            fill="#CBD5E1"
          />
          <path
            d="M 600,250 l 20,-10 l -20,20 l -20,-10 z"
            fill="#CBD5E1"
          />
        </svg>

        {/* Phase Cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1
        }}>
          {strategies.map((strategy, index) => (
            <div
              key={index}
              style={{
                width: '300px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '24px',
                border: `2px solid ${strategy.color}`
              }}
            >
              <div style={{
                backgroundColor: strategy.color,
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {strategy.phase}
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {strategy.items.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '16px',
                      fontSize: '14px'
                    }}
                  >
                    <span style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: strategy.color,
                      borderRadius: '50%',
                      marginRight: '12px',
                      flexShrink: 0
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthStrategy;