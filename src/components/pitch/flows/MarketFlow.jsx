// src/components/flows/MarketFlow.jsx
const MarketFlow = () => {
  return (
    <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="800" height="280" fill="white" rx="10"/>

      {/* Graph Container */}
      <g transform="translate(100, 220)">
        {/* Axes */}
        <line x1="0" y1="0" x2="600" y2="0" stroke="#cbd5e1" strokeWidth="1.5"/>
        <line x1="0" y1="0" x2="0" y2="-150" stroke="#cbd5e1" strokeWidth="1.5"/>
        
        {/* Market Growth Line */}
        <path 
          d="M 0 -50 Q 300 -100, 600 -140" 
          fill="none" 
          stroke="#4F46E5" 
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Data Points */}
        <circle cx="0" cy="-50" r="4" fill="#4F46E5"/>
        <circle cx="300" cy="-100" r="4" fill="#4F46E5"/>
        <circle cx="600" cy="-140" r="4" fill="#4F46E5"/>
        
        {/* Axis Labels */}
        <text 
          x="0" 
          y="20" 
          textAnchor="middle" 
          fontSize="14" 
          fill="#64748b"
          fontFamily="sans-serif"
        >
          2020
        </text>
        <text 
          x="300" 
          y="20" 
          textAnchor="middle" 
          fontSize="14" 
          fill="#64748b"
          fontFamily="sans-serif"
        >
          2024
        </text>
        <text 
          x="600" 
          y="20" 
          textAnchor="middle" 
          fontSize="14" 
          fill="#64748b"
          fontFamily="sans-serif"
        >
          2027
        </text>
        
        {/* Value Labels */}
        <text 
          x="-8" 
          y="-50" 
          textAnchor="end" 
          fontSize="14" 
          fill="#475569"
          fontFamily="sans-serif"
        >
          $31.5B
        </text>
        <text 
          x="-8" 
          y="-100" 
          textAnchor="end" 
          fontSize="14" 
          fill="#475569"
          fontFamily="sans-serif"
        >
          $43.2B
        </text>
        <text 
          x="-8" 
          y="-140" 
          textAnchor="end" 
          fontSize="14" 
          fill="#475569"
          fontFamily="sans-serif"
        >
          $54.9B
        </text>
      </g>
    </svg>
  );
};

export default MarketFlow;