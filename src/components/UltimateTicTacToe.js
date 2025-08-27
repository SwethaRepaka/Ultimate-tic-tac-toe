import React from "react";
import MiniBoard from "./MiniBoard";
import { useGameLogic } from "../hooks/useGameLogic";
import { classNames } from "../utils/gameUtils";

export default function UltimateTicTacToe() {
  const {
    boards,
    miniWinners,
    currentPlayer,
    forced,
    globalWinner,
    history,
    undoCount,
    status,
    handlePlay,
    handleRestart,
    handleUndo,
  } = useGameLogic();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Ultimate Tic Tac Toe</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={history.length === 0 || !!globalWinner}
              className={classNames(
                "px-4 py-2 rounded-2xl shadow-sm",
                history.length === 0 || !!globalWinner
                  ? "bg-zinc-300 text-zinc-600 cursor-not-allowed"
                  : "bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              )}
            >
              Undo
            </button>
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-2xl shadow-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Restart
            </button>
          </div>
        </header>

        <div className="mb-4">
          <div className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white dark:bg-zinc-800 shadow-sm">
            <div className={classNames(
              "w-3 h-3 rounded-full",
              currentPlayer === "X" ? "bg-indigo-500" : "bg-emerald-500"
            )} />
            <span className="text-sm sm:text-base font-medium">{status}</span>
          </div>
        </div>

        {/* Macro board */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4 p-2 md:p-3 rounded-3xl bg-white dark:bg-zinc-800 shadow">
          {boards.map((mini, i) => (
            <MiniBoard
              key={i}
              index={i}
              cells={mini}
              onPlay={handlePlay}
              winner={miniWinners[i]}
              forced={forced}
              isForcedTarget={forced === null || forced === i}
              disabled={!!globalWinner}
            />)
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 grid gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <p>
            <span className="font-semibold">Rule reminder:</span> The cell you choose sends your opponent to the mini-board with the same position.
          </p>
          <p>
            If that target mini-board is already won or full, your opponent may play anywhere.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-zinc-500">
          Built with React + Tailwind. Hot-seat mode. No external state management.
        </footer>
      </div>
    </div>
  );
}
