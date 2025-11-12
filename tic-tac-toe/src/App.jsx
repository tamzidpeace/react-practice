import { useState } from 'react'
import Board from './components/Board'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState(null)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index] || winner) {
      return
    }

    const newBoard = board.slice()
    newBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)

    const gameWinner = calculateWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setWinner(null)
  }

  const isDraw = !winner && board.every(square => square !== null)

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (isDraw) {
    status = 'Game Draw!'
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Tic-Tac-Toe
        </h1>
        
        <div className="text-center mb-6">
          <div className={`text-xl font-semibold px-4 py-2 rounded-lg ${
            winner 
              ? 'bg-green-100 text-green-800' 
              : isDraw 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {status}
          </div>
        </div>

        <Board 
          board={board}
          onClick={handleClick}
          winner={winner}
        />

        <div className="text-center mt-6">
          <button
            onClick={resetGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default App