import Square from './Square';

const Board = ({ squares, onClick, winningSquares }) => {
  const renderSquare = (index) => {
    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onClick(index)}
        isWinning={winningSquares?.includes(index)}
        isDisabled={squares[index] !== null || winningSquares !== null}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderSquare(index))}
    </div>
  );
};

export default Board;

