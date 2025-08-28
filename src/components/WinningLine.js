import React from "react";
import { LINES } from "../utils/gameUtils";

export default function WinningLine({ 
  winner, 
  line, 
  lineIndex, 
  size = "mini", 
  className = "" 
}) {
  if (!winner || !line || winner === "D") return null;

  // Line coordinates for different line types
  const getLineCoordinates = () => {
    const [a, b, c] = line;
    
    // Horizontal lines (0, 1, 2)
    if (lineIndex === 0) return { x1: "10%", y1: "16.67%", x2: "90%", y2: "16.67%" };
    if (lineIndex === 1) return { x1: "10%", y1: "50%", x2: "90%", y2: "50%" };
    if (lineIndex === 2) return { x1: "10%", y1: "83.33%", x2: "90%", y2: "83.33%" };
    
    // Vertical lines (3, 4, 5)
    if (lineIndex === 3) return { x1: "16.67%", y1: "10%", x2: "16.67%", y2: "90%" };
    if (lineIndex === 4) return { x1: "50%", y1: "10%", x2: "50%", y2: "90%" };
    if (lineIndex === 5) return { x1: "83.33%", y1: "10%", x2: "83.33%", y2: "90%" };
    
    // Diagonal lines (6, 7)
    if (lineIndex === 6) return { x1: "10%", y1: "10%", x2: "90%", y2: "90%" };
    if (lineIndex === 7) return { x1: "90%", y1: "10%", x2: "10%", y2: "90%" };
    
    return { x1: "10%", y1: "16.67%", x2: "90%", y2: "16.67%" };
  };

  const coords = getLineCoordinates();
  const isDiagonal = lineIndex === 6 || lineIndex === 7;
  
  // Different styles for mini-board vs big board
  const lineStyle = size === "big" ? {
    strokeWidth: "4",
    stroke: winner === "X" ? "#4f46e5" : "#059669", // indigo-600 : emerald-600
    filter: "drop-shadow(0 0 8px rgba(79, 70, 229, 0.6))"
  } : {
    strokeWidth: "2",
    stroke: winner === "X" ? "#4f46e5" : "#059669",
    filter: "drop-shadow(0 0 4px rgba(79, 70, 229, 0.4))"
  };

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 10 }}
    >
      <defs>
        <filter id={`glow-${size}-${lineIndex}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
        {...lineStyle}
        filter={`url(#glow-${size}-${lineIndex})`}
        className="animate-draw-line"
        style={{
          strokeDasharray: isDiagonal ? "1000" : "1000",
          strokeDashoffset: "1000",
          animation: "drawLine 0.8s ease-out forwards"
        }}
      />
    </svg>
  );
}
