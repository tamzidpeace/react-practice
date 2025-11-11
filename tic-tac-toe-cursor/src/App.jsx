import { useState, useEffect } from 'react';
import Board from './components/Board';
import { calculateWinner, checkDraw } from './utils/gameLogic';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [startingPlayer, setStartingPlayer] = useState('X');

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.line;
  const isDraw = !winner && checkDraw(squares);

  // Log game progress with useEffect
  useEffect(() => {
    if (winner) {
      console.log(`🎉 Game Over! Winner: ${winner}`);
    } else if (isDraw) {
      console.log('🤝 Game Over! It\'s a draw!');
    } else {
      console.log(`Current turn: ${isXNext ? 'X' : 'O'}`);
    }
  }, [winner, isDraw, isXNext]);

  const handleClick = (index) => {
    // Prevent click if square is filled or game is over
    if (squares[index] || winner || isDraw) {
      return;
    }

    // Create a copy of squares array (immutable update)
    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';

    // Update state
    setSquares(newSquares);
    setIsXNext(!isXNext);

    // Update history
    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newSquares]);
    setCurrentMove(currentMove + 1);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(startingPlayer === 'X');
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const goToMove = (move) => {
    setCurrentMove(move);
    setSquares(history[move]);
    
    // Calculate whose turn it should be
    const moves = history[move].filter(Boolean).length;
    setIsXNext((startingPlayer === 'X' && moves % 2 === 0) || (startingPlayer === 'O' && moves % 2 === 1));
  };

  const changeStartingPlayer = (player) => {
    setStartingPlayer(player);
    setIsXNext(player === 'X');
  };

  // Status message
  let status;
  if (winner) {
    status = (
      <div className="text-3xl font-bold text-green-600 animate-bounce">
        🎉 {winner} Wins!
      </div>
    );
  } else if (isDraw) {
    status = (
      <div className="text-3xl font-bold text-yellow-600">
        🤝 It's a Draw!
      </div>
    );
  } else {
    status = (
      <div className="text-2xl font-semibold text-gray-700">
        Next Player:{' '}
        <span className={isXNext ? 'text-blue-500' : 'text-red-500'}>
          {isXNext ? 'X' : 'O'}
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Tic-Tac-Toe
          </h1>
          <p className="text-gray-600">
            Built with React 19 & Tailwind CSS
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Game Board Section */}
          <div className="flex flex-col items-center">
            {/* Status Banner */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-lg min-w-[320px] text-center">
              {status}
            </div>

            {/* Board */}
            <Board
              squares={squares}
              onClick={handleClick}
              winningSquares={winningSquares}
            />

            {/* Game Controls */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                🔄 Reset Game
              </button>
            </div>
          </div>

          {/* Side Panel - Settings & History */}
          <div className="flex flex-col gap-6 w-full lg:w-80">
            {/* Settings Panel */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                ⚙️ Settings
              </h2>
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-2">
                  Choose Starting Player:
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => changeStartingPlayer('X')}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      startingPlayer === 'X'
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    X
                  </button>
                  <button
                    onClick={() => changeStartingPlayer('O')}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      startingPlayer === 'O'
                        ? 'bg-red-500 text-white shadow-lg scale-105'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    O
                  </button>
                </div>
              </div>
            </div>

            {/* Move History Panel */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📜 Move History
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.map((step, move) => {
                  const desc = move === 0 ? 'Go to game start' : `Go to move #${move}`;
                  return (
                    <button
                      key={move}
                      onClick={() => goToMove(move)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        move === currentMove
                          ? 'bg-purple-500 text-white font-semibold shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {move === currentMove ? '➤ ' : ''}
                      {desc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📊 Game Stats
              </h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Total Moves:</span>
                  <span className="font-semibold">{currentMove}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Turn:</span>
                  <span className={`font-semibold ${isXNext ? 'text-blue-500' : 'text-red-500'}`}>
                    {isXNext ? 'X' : 'O'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold">
                    {winner ? `${winner} Won!` : isDraw ? 'Draw' : 'Playing'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            🎮 Use move history to undo/redo moves • ⚙️ Customize starting player
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
