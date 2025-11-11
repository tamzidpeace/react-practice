import { useEffect, useMemo, useState } from 'react'
import './App.css'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const STARTER_OPTIONS = ['X', 'O']

const createEmptyBoard = () => Array(9).fill(null)

const determineNextPlayer = (starter, moveIndex) => {
  const evenMove = moveIndex % 2 === 0
  if (starter === 'X') {
    return evenMove ? 'X' : 'O'
  }
  return evenMove ? 'O' : 'X'
}

const calculateWinner = (squares) => {
  for (const combo of WINNING_LINES) {
    const [a, b, c] = combo
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], combo }
    }
  }
  return null
}

const formatPosition = (index) => {
  if (index == null) return ''
  const row = Math.floor(index / 3) + 1
  const column = (index % 3) + 1
  return `row ${row}, col ${column}`
}

function Square({ value, onClick, isWinning, disabled }) {
  const baseClasses =
    'relative flex h-20 w-20 items-center justify-center rounded-2xl border text-3xl font-semibold transition-all duration-200 sm:h-24 sm:w-24 md:h-28 md:w-28'

  const stateClasses = isWinning
    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-500/30'
    : 'border-white/10 bg-white/5 text-slate-100 hover:border-indigo-400 hover:bg-indigo-500/10'

  const disabledClasses = disabled
    ? 'cursor-not-allowed opacity-60 hover:bg-white/5 hover:border-white/10'
    : 'cursor-pointer'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${disabledClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
    >
      {value ?? ''}
    </button>
  )
}

function Board({ squares, onSquareClick, winningCombo, isLocked }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinning={winningCombo.includes(index)}
          disabled={Boolean(value) || isLocked}
        />
      ))}
    </div>
  )
}

function MoveHistory({ history, currentMove, onJumpTo }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        Move History
      </p>
      <ol className="mt-4 space-y-2">
        {history.map((entry, index) => {
          const isActive = index === currentMove
          const label =
            index === 0
              ? 'Game start'
              : `${entry.player} → ${formatPosition(entry.lastMoveIndex)}`

          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => onJumpTo(index)}
                disabled={isActive}
                className={`w-full rounded-2xl border px-4 py-2 text-left text-sm transition ${
                  isActive
                    ? 'border-indigo-400 bg-indigo-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-slate-200 hover:border-indigo-400 hover:bg-indigo-500/10'
                }`}
              >
                <span className="font-semibold">#{index}</span>{' '}
                <span className="text-slate-300">{label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function App() {
  const [starter, setStarter] = useState('X')
  const [history, setHistory] = useState([
    { squares: createEmptyBoard(), player: null, lastMoveIndex: null },
  ])
  const [currentMove, setCurrentMove] = useState(0)

  const currentState = history[currentMove]
  const currentBoard = currentState.squares
  const nextPlayer = determineNextPlayer(starter, currentMove)

  const winnerInfo = useMemo(() => calculateWinner(currentBoard), [currentBoard])
  const winner = winnerInfo?.player ?? null
  const winningCombo = winnerInfo?.combo ?? []
  const isDraw = !winner && currentBoard.every(Boolean)
  const isBoardLocked = Boolean(winner) || isDraw

  useEffect(() => {
    if (currentMove === 0) return
    const { player, lastMoveIndex } = history[currentMove]
    if (player == null || lastMoveIndex == null) return
    const row = Math.floor(lastMoveIndex / 3) + 1
    const column = (lastMoveIndex % 3) + 1
    console.info(
      `[TicTacToe] Move ${currentMove}: ${player} placed at row ${row}, column ${column}`,
    )
  }, [currentMove, history])

  const handleSquareClick = (index) => {
    if (currentBoard[index] || isBoardLocked) return

    const nextSquares = [...currentBoard]
    nextSquares[index] = nextPlayer

    setHistory((prevHistory) => {
      const trimmedHistory = prevHistory.slice(0, currentMove + 1)
      return [
        ...trimmedHistory,
        { squares: nextSquares, player: nextPlayer, lastMoveIndex: index },
      ]
    })
    setCurrentMove((prev) => prev + 1)
  }

  const handleJumpTo = (moveIndex) => {
    setCurrentMove(moveIndex)
  }

  const handleReset = () => {
    setHistory([{ squares: createEmptyBoard(), player: null, lastMoveIndex: null }])
    setCurrentMove(0)
  }

  const allowStarterChange = history.length === 1 && currentMove === 0

  const handleStarterChange = (nextStarter) => {
    if (!allowStarterChange) return
    setStarter(nextStarter)
  }

  const statusMessage = winner
    ? `${winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `${nextPlayer}'s turn`

  const helperMessage = winner
    ? 'Great game! Hit reset to challenge a friend.'
    : isDraw
      ? 'All squares filled with no winner. Try a rematch!'
      : 'Pick an empty square to play your move.'

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-indigo-400">
            React + Tailwind Challenge
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Interactive Tic-Tac-Toe
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Practice component composition, lifted state, and pure game logic with a
            polished UI that feels at home in any classroom walkthrough.
          </p>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                  Game Status
                </p>
                <p
                  className={`text-3xl font-semibold ${
                    winner
                      ? 'text-emerald-300'
                      : isDraw
                        ? 'text-amber-300'
                        : 'text-white'
                  }`}
                >
                  {statusMessage}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${
                  winner
                    ? 'border-emerald-400 text-emerald-200'
                    : isDraw
                      ? 'border-amber-400 text-amber-200'
                      : 'border-indigo-400 text-indigo-200'
                }`}
              >
                {winner ? 'Victory' : isDraw ? 'Stalemate' : `Next: ${nextPlayer}`}
              </span>
            </div>
            <p className="text-sm text-slate-400">{helperMessage}</p>

            <Board
              squares={currentBoard}
              onSquareClick={handleSquareClick}
              winningCombo={winningCombo}
              isLocked={isBoardLocked}
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:flex-none sm:px-6"
              >
                Reset Game
              </button>
              <div className="flex flex-1 justify-end gap-2 sm:flex-none">
                {STARTER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleStarterChange(option)}
                    disabled={!allowStarterChange}
                    className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                      starter === option
                        ? 'border-indigo-400 bg-indigo-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200'
                    } ${allowStarterChange ? 'hover:border-indigo-400 hover:bg-indigo-500/10' : 'cursor-not-allowed opacity-60'}`}
                  >
                    {option} starts
                  </button>
                ))}
              </div>
            </div>
            {!allowStarterChange && (
              <p className="text-xs text-slate-500">
                Starter can only be changed before the first move. Use reset to pick a new
                opener.
              </p>
            )}
          </section>

          <section className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-950/60 p-5 shadow-2xl shadow-black/50">
              <h2 className="text-lg font-semibold text-white">Why this build?</h2>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-300">
                <li>State lifted into the App shell and shared via props.</li>
                <li>Pure helper to calculate winners keeps logic testable.</li>
                <li>History list enables live undo/redo demos.</li>
                <li>Tailwind utility classes keep layout responsive by default.</li>
              </ul>
            </div>

            <MoveHistory
              history={history}
              currentMove={currentMove}
              onJumpTo={handleJumpTo}
            />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
