import { useState, useMemo, useEffect } from "react";
import { calcWinner, boardFull, getWinningLine } from "../utils/gameUtils";

export function useGameLogic() {
  // boards: 9 mini-boards, each is array(9). null | 'X' | 'O'
  const [boards, setBoards] = useState(Array.from({ length: 9 }, () => Array(9).fill(null)));
  // winners of mini-boards: null | 'X' | 'O' | 'D' (draw)
  const [miniWinners, setMiniWinners] = useState(Array(9).fill(null));
  // winning lines for mini-boards
  const [miniWinningLines, setMiniWinningLines] = useState(Array(9).fill(null));
  // whose turn
  const [xIsNext, setXIsNext] = useState(true);
  // forced mini-board index (0..8) or null for free move
  const [forced, setForced] = useState(null);
  // overall winner null | 'X' | 'O' | 'D'
  const [globalWinner, setGlobalWinner] = useState(null);
  // winning line for the big board
  const [bigBoardWinningLine, setBigBoardWinningLine] = useState(null);
  // history for undo
  const [history, setHistory] = useState([]);
  // undo count - limit to 3 per game
  const [undoCount, setUndoCount] = useState(0);

  const currentPlayer = xIsNext ? "X" : "O";

  const globalWinnerCalc = useMemo(() => {
    const macro = miniWinners.map((w) => (w === "X" || w === "O" ? w : null));
    const winnerResult = calcWinner(macro);
    if (winnerResult) {
      // Update big board winning line
      setBigBoardWinningLine({
        line: winnerResult.line,
        lineIndex: winnerResult.lineIndex
      });
      return winnerResult.winner;
    }
    // draw if all minis finished and no macro winner
    if (miniWinners.every((w) => w !== null)) return "D";
    return null;
  }, [miniWinners]);

  // keep global winner in state for freeze UI
  useEffect(() => {
    if (globalWinnerCalc !== globalWinner) setGlobalWinner(globalWinnerCalc);
  }, [globalWinnerCalc, globalWinner]);

  function handlePlay(miniIndex, cellIndex) {
    if (globalWinner) return;
    if (forced !== null && forced !== miniIndex) return; // illegal
    if (miniWinners[miniIndex] !== null) return;
    if (boards[miniIndex][cellIndex] !== null) return;

    // push history for undo
    setHistory((h) => [
      ...h,
      {
        boards: boards.map((b) => [...b]),
        miniWinners: [...miniWinners],
        miniWinningLines: [...miniWinningLines],
        xIsNext,
        forced,
        globalWinner,
        bigBoardWinningLine,
      },
    ]);

    const nextBoards = boards.map((b, i) => (i === miniIndex ? b.map((c, j) => (j === cellIndex ? currentPlayer : c)) : [...b]));

    // compute mini-board winner/draw after move
    const winnerResult = calcWinner(nextBoards[miniIndex]);
    const miniDone = winnerResult ? winnerResult.winner : boardFull(nextBoards[miniIndex]) ? "D" : null;
    const nextMiniWinners = miniWinners.map((w, i) => (i === miniIndex ? (miniDone ? miniDone : w) : w));
    
    // update mini-board winning lines
    const nextMiniWinningLines = miniWinningLines.map((line, i) => 
      (i === miniIndex && winnerResult && winnerResult.winner !== "D") ? {
        line: winnerResult.line,
        lineIndex: winnerResult.lineIndex
      } : line
    );

    // compute next forced board: equals the cell index just played
    // unless that target mini-board is already closed or full -> free move (null)
    let nextForced = cellIndex;
    const targetClosed = nextMiniWinners[nextForced] !== null;
    const targetFull = boardFull(nextBoards[nextForced]);
    if (targetClosed || targetFull) nextForced = null;

    setBoards(nextBoards);
    setMiniWinners(nextMiniWinners);
    setMiniWinningLines(nextMiniWinningLines);
    setForced(nextForced);
    setXIsNext((v) => !v);
  }

  function handleRestart() {
    setBoards(Array.from({ length: 9 }, () => Array(9).fill(null)));
    setMiniWinners(Array(9).fill(null));
    setMiniWinningLines(Array(9).fill(null));
    setXIsNext(true);
    setForced(null);
    setGlobalWinner(null);
    setBigBoardWinningLine(null);
    setHistory([]);
    setUndoCount(0);
  }

  function handleUndo() {
    const prev = history[history.length - 1];
    if (!prev || undoCount >= 3) return; // Max 3 undos allowed
    setBoards(prev.boards.map((b) => [...b]));
    setMiniWinners([...prev.miniWinners]);
    setMiniWinningLines([...prev.miniWinningLines]);
    setXIsNext(prev.xIsNext);
    setForced(prev.forced);
    setGlobalWinner(prev.globalWinner);
    setBigBoardWinningLine(prev.bigBoardWinningLine);
    setHistory((h) => h.slice(0, -1));
    setUndoCount(undoCount + 1);
  }

  const status = useMemo(() => {
    if (globalWinner === "D") return "Game drawn";
    if (globalWinner === "X" || globalWinner === "O") return `${globalWinner} wins the game!`;
    if (forced === null) return `${currentPlayer}'s turn — play anywhere`;
    const row = Math.floor(forced / 3) + 1;
    const col = (forced % 3) + 1;
    return `${currentPlayer}'s turn — play in mini-board (${row}, ${col})`;
  }, [globalWinner, forced, currentPlayer]);

  return {
    boards,
    miniWinners,
    miniWinningLines,
    currentPlayer,
    forced,
    globalWinner,
    bigBoardWinningLine,
    history,
    undoCount,
    status,
    handlePlay,
    handleRestart,
    handleUndo,
  };
}
