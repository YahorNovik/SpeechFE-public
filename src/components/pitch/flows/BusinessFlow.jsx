// src/components/flows/BusinessFlow.jsx
const BusinessFlow = () => {
    return (
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="800" height="400" fill="#f8fafc" rx="10"/>
        
        {/* Title */}
        <text x="400" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b">
          Subscription Tiers
        </text>
        
        {/* Basic Plan */}
        <g transform="translate(100, 100)">
          <rect width="180" height="220" rx="10" fill="#bfdbfe" opacity="0.5"/>
          <text x="90" y="40" textAnchor="middle" fontSize="20" fontWeight="bold">Basic Plan</text>
          <text x="90" y="80" textAnchor="middle" fontSize="14">• Limited minutes</text>
          <text x="90" y="110" textAnchor="middle" fontSize="14">• Basic analysis</text>
          <text x="90" y="140" textAnchor="middle" fontSize="14">• Essential features</text>
        </g>
        
        {/* Premium Plan */}
        <g transform="translate(310, 80)">
          <rect width="180" height="260" rx="10" fill="#3b82f6" opacity="0.5"/>
          <text x="90" y="40" textAnchor="middle" fontSize="20" fontWeight="bold">Premium Plan</text>
          <text x="90" y="80" textAnchor="middle" fontSize="14">• Unlimited minutes</text>
          <text x="90" y="110" textAnchor="middle" fontSize="14">• Advanced analysis</text>
          <text x="90" y="140" textAnchor="middle" fontSize="14">• Priority processing</text>
          <text x="90" y="170" textAnchor="middle" fontSize="14">• Custom exercises</text>
        </g>
        
        {/* Enterprise Plan */}
        <g transform="translate(520, 100)">
          <rect width="180" height="220" rx="10" fill="#1d4ed8" opacity="0.5"/>
          <text x="90" y="40" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ffffff">Enterprise</text>
          <text x="90" y="80" textAnchor="middle" fontSize="14" fill="#ffffff">• Custom solutions</text>
          <text x="90" y="110" textAnchor="middle" fontSize="14" fill="#ffffff">• Bulk management</text>
          <text x="90" y="140" textAnchor="middle" fontSize="14" fill="#ffffff">• Dedicated support</text>
        </g>
      </svg>
    );
  };
  
  export default BusinessFlow;