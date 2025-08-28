// Game logic constants and helper functions
export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calcWinner(cells) {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line: LINES[i], lineIndex: i };
    }
  }
  return null;
}

export function getWinningLine(cells) {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { line: LINES[i], lineIndex: i };
    }
  }
  return null;
}

export function boardFull(cells) {
  return cells.every((c) => c !== null);
}

export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}
