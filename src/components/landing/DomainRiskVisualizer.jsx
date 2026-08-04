import React from 'react';

export default function DomainRiskVisualizer({ domainName, riskPercentage }) {
  // Convert percentage to number of active lines (out of 10)
  // We use Math.ceil so even a 5% risk shows at least 1 line
  const activeLines = riskPercentage > 0 ? Math.ceil(riskPercentage / 10) : 0;

  // Define a single color based on the overall risk percentage
  const getActiveColor = () => {
    if (riskPercentage <= 30) return 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]';   // Low Risk
    if (riskPercentage <= 70) return 'bg-orange-400 shadow-[0_0_5px_rgba(251,146,60,0.4)]'; // Moderate Risk
    return 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.4)]';                               // High Risk
  };

  const activeColor = getActiveColor();

  return (
    <div className="flex items-center justify-between mb-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Domain Name */}
      <span className="text-sm font-medium text-gray-700 w-1/2 truncate pr-2">
        {domainName}
      </span>
      
      {/* The 10 Vertical Lines (||||||||||) */}
      <div className="flex gap-1 items-center">
        {[...Array(10)].map((_, index) => {
          const isActive = index < activeLines;
          return (
            <div
              key={index}
              className={`w-1.5 h-5 rounded-full transition-all duration-500 ${
                isActive ? activeColor : 'bg-gray-200'
              }`}
            />
          );
        })}
      </div>

      {/* Percentage Display */}
      <span className="text-xs font-bold text-gray-500 w-12 text-right">
        {Math.round(riskPercentage)}%
      </span>
    </div>
  );
}
