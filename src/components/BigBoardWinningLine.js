import React from "react";

export default function BigBoardWinningLine({ 
  winner, 
  line, 
  lineIndex 
}) {
  if (!winner || !line || winner === "D") return null;

  // Get coordinates for the big board winning line
  const getBigBoardLineCoordinates = () => {
    const [a, b, c] = line;
    
    // Horizontal lines (0, 1, 2)
    if (lineIndex === 0) return { x1: "5%", y1: "16.67%", x2: "95%", y2: "16.67%" };
    if (lineIndex === 1) return { x1: "5%", y1: "50%", x2: "95%", y2: "50%" };
    if (lineIndex === 2) return { x1: "5%", y1: "83.33%", x2: "95%", y2: "83.33%" };
    
    // Vertical lines (3, 4, 5)
    if (lineIndex === 3) return { x1: "16.67%", y1: "5%", x2: "16.67%", y2: "95%" };
    if (lineIndex === 4) return { x1: "50%", y1: "5%", x2: "50%", y2: "95%" };
    if (lineIndex === 5) return { x1: "83.33%", y1: "5%", x2: "83.33%", y2: "95%" };
    
    // Diagonal lines (6, 7)
    if (lineIndex === 6) return { x1: "5%", y1: "5%", x2: "95%", y2: "95%" };
    if (lineIndex === 7) return { x1: "95%", y1: "5%", x2: "5%", y2: "95%" };
    
    return { x1: "5%", y1: "16.67%", x2: "95%", y2: "16.67%" };
  };

  const coords = getBigBoardLineCoordinates();
  const isDiagonal = lineIndex === 6 || lineIndex === 7;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20 }}
    >
      <defs>
        <filter id="bigBoardGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <line
        x1={coords.x1}
        y1={coords.y1}
        x2={coords.x2}
        y2={coords.y2}
        strokeWidth="6"
        stroke={winner === "X" ? "#4f46e5" : "#059669"} // indigo-600 : emerald-600
        filter="url(#bigBoardGlow)"
        className="animate-big-board-glow"
        style={{
          strokeDasharray: "2000",
          strokeDashoffset: "2000",
          animation: "drawLine 1.2s ease-out forwards, bigBoardGlow 2s ease-in-out infinite"
        }}
      />
    </svg>
  );
}
