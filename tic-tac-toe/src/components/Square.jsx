function Square({ value, onClick, disabled }) {
  const getSquareStyles = () => {
    let baseStyles = "w-20 h-20 text-3xl font-bold rounded-lg transition-all duration-200 "
    
    if (disabled) {
      baseStyles += "bg-gray-200 text-gray-600 cursor-not-allowed "
    } else {
      baseStyles += "bg-white hover:bg-blue-50 text-gray-800 cursor-pointer "
      baseStyles += "hover:shadow-lg hover:scale-105 "
      baseStyles += "border-2 border-gray-300 hover:border-blue-400 "
    }

    if (value === 'X') {
      baseStyles += "text-blue-600 bg-blue-50 border-blue-300 "
    } else if (value === 'O') {
      baseStyles += "text-red-600 bg-red-50 border-red-300 "
    }

    return baseStyles
  }

  return (
    <button
      className={getSquareStyles()}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Square