import Square from './Square'

function Board({ board, onClick, winner }) {
  const renderSquare = (index) => {
    return (
      <Square
        key={index}
        value={board[index]}
        onClick={() => onClick(index)}
        disabled={board[index] !== null || winner !== null}
      />
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
    </div>
  )
}

export default Board