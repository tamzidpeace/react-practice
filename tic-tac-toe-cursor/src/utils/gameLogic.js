/**
 * Calculate the winner and return both the winner and winning line
 * @param {Array} squares - Array of 9 squares
 * @returns {Object|null} - Object with winner and line, or null
 */
export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
};

/**
 * Check if the game is a draw
 * @param {Array} squares - Array of 9 squares
 * @returns {boolean} - True if draw, false otherwise
 */
export const checkDraw = (squares) => {
  return squares.every((square) => square !== null);
};

