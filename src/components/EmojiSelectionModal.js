import React, { useState } from "react";
import { classNames } from "../utils/gameUtils";

const EMOJI_OPTIONS = [
  "🐱", "🐶", "🦊", "🐼", "🐨", "🐯",
  "⭐", "🌟", "💎", "🎯", "🚀", "🎪",
  "😀", "😎", "🤖", "👻", "🥸", "🤡",
  "🦄", "🐉", "🦋", "🌺", "🍀", "🌈"
];

export default function EmojiSelectionModal({ 
  isOpen, 
  onEmojisSelected, 
  onClose 
}) {
  const [player1Emoji, setPlayer1Emoji] = useState("");
  const [player2Emoji, setPlayer2Emoji] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [error, setError] = useState("");

  const handleEmojiSelect = (emoji) => {
    if (currentPlayer === 1) {
      if (emoji === player2Emoji) {
        setError("Please choose a different emoji than Player 2");
        return;
      }
      setPlayer1Emoji(emoji);
      setCurrentPlayer(2);
      setError("");
    } else {
      if (emoji === player1Emoji) {
        setError("Please choose a different emoji than Player 1");
        return;
      }
      setPlayer2Emoji(emoji);
    }
  };

  const handleStartGame = () => {
    if (player1Emoji && player2Emoji) {
      // Save to localStorage for persistence
      localStorage.setItem('ultimateTicTacToe_emojis', JSON.stringify({
        player1: player1Emoji,
        player2: player2Emoji
      }));
      
      onEmojisSelected(player1Emoji, player2Emoji);
    }
  };

  const handleRandomize = () => {
    const availableEmojis = EMOJI_OPTIONS.filter(
      emoji => emoji !== player1Emoji && emoji !== player2Emoji
    );
    
    if (availableEmojis.length >= 2) {
      const random1 = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
      const remaining = availableEmojis.filter(emoji => emoji !== random1);
      const random2 = remaining[Math.floor(Math.random() * remaining.length)];
      
      setPlayer1Emoji(random1);
      setPlayer2Emoji(random2);
      setCurrentPlayer(1);
      setError("");
    }
  };

  const handleReset = () => {
    setPlayer1Emoji("");
    setPlayer2Emoji("");
    setCurrentPlayer(1);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Choose Your Emojis
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {currentPlayer === 1 
              ? "Player 1, pick your emoji!" 
              : "Player 2, pick your emoji!"
            }
          </p>
        </div>

        {/* Current Selection Display */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className={classNames(
              "w-16 h-16 rounded-2xl border-4 flex items-center justify-center text-3xl mb-2",
              currentPlayer === 1 ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-zinc-300 dark:border-zinc-600"
            )}>
              {player1Emoji || "?"}
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Player 1</span>
          </div>
          
          <div className="text-center">
            <div className={classNames(
              "w-16 h-16 rounded-2xl border-4 flex items-center justify-center text-3xl mb-2",
              currentPlayer === 2 ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-zinc-300 dark:border-zinc-600"
            )}>
              {player2Emoji || "?"}
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Player 2</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Emoji Grid */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {EMOJI_OPTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiSelect(emoji)}
              disabled={emoji === player1Emoji || emoji === player2Emoji}
              className={classNames(
                "w-12 h-12 text-2xl rounded-xl transition-all duration-200",
                "hover:scale-110 hover:bg-zinc-100 dark:hover:bg-zinc-700",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
                emoji === player1Emoji || emoji === player2Emoji ? "bg-zinc-200 dark:bg-zinc-700" : "bg-zinc-50 dark:bg-zinc-900"
              )}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRandomize}
            className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
          >
            🎲 Random
          </button>
          
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          disabled={!player1Emoji || !player2Emoji}
          className={classNames(
            "w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all duration-200",
            player1Emoji && player2Emoji
              ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]"
              : "bg-zinc-300 text-zinc-600 cursor-not-allowed"
          )}
        >
          🚀 Start Game!
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
