import React from "react";
import { classNames } from "../utils/gameUtils";
import WinningLine from "./WinningLine";

export default function MiniBoard({
  index,
  cells,
  onPlay,
  winner,
  winningLine,
  forced,
  isForcedTarget,
  disabled,
}) {
  const isClosed = winner !== null; // 'X' | 'O' | 'D' (draw) treated as closed

  return (
    <div
      className={classNames(
        "relative grid grid-cols-3 grid-rows-3 gap-1 p-1 rounded-2xl",
        "bg-zinc-50 dark:bg-zinc-900",
        "shadow-sm",
        isClosed ? "opacity-70" : "",
        disabled && !isForcedTarget ? "opacity-50" : "",
        isForcedTarget && !isClosed ? "ring-4 ring-indigo-400" : "ring-1 ring-zinc-300"
      )}
      aria-label={`Mini board ${index + 1}`}
    >
      {cells.map((val, i) => (
        <button
          key={i}
          aria-label={`Cell ${i + 1} in mini ${index + 1}`}
          disabled={disabled || isClosed || val !== null || (forced !== null && !isForcedTarget)}
          onClick={() => onPlay(index, i)}
          className={classNames(
            "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24",
            "flex items-center justify-center text-2xl md:text-4xl font-bold",
            "bg-white dark:bg-zinc-800 rounded-xl",
            "hover:scale-[1.02] transition-transform",
            val ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <span
            className={classNames(
              val === "X" ? "text-indigo-600" : val === "O" ? "text-emerald-600" : ""
            )}
          >
            {val}
          </span>
        </button>
      ))}

      {/* Winning line animation */}
      {winningLine && (
        <WinningLine
          winner={winner}
          line={winningLine.line}
          lineIndex={winningLine.lineIndex}
          size="mini"
        />
      )}

      {/* Mini-board overlay badge when closed */}
      {winner && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="pointer-events-none rounded-2xl px-3 py-1 text-white text-sm font-semibold bg-black/40 backdrop-blur">
            {winner === "D" ? "Draw" : `${winner} wins`}
          </div>
        </div>
      )}
    </div>
  );
}
