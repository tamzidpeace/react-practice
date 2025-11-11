const Square = ({ value, onClick, isWinning, isDisabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-24 h-24 text-4xl font-bold 
        border-2 border-gray-300 rounded-lg
        transition-all duration-200 ease-in-out
        ${value === 'X' ? 'text-blue-500' : 'text-red-500'}
        ${isWinning ? 'bg-green-200 border-green-500 scale-105' : 'bg-white hover:bg-gray-50'}
        ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:shadow-lg hover:scale-105'}
        focus:outline-none focus:ring-2 focus:ring-blue-400
      `}
    >
      {value}
    </button>
  );
};

export default Square;

