# 🎮 Tic-Tac-Toe Game

An interactive, feature-rich **Tic-Tac-Toe** game built with **React 19** and **Tailwind CSS**. Perfect for learning React fundamentals including component design, state management, prop passing, and event handling.

![React](https://img.shields.io/badge/React-19.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff)

---

## ✨ Features

### Core Features
- ✅ **Two-player gameplay** with alternating turns (X and O)
- ✅ **Winner detection** with 3-in-a-row/column/diagonal logic
- ✅ **Draw detection** when board is full with no winner
- ✅ **Reset game** functionality to start fresh
- ✅ **Responsive design** that works on mobile, tablet, and desktop

### Advanced Features
- 🎨 **Win highlighting** - Winning squares are highlighted with green
- 🔄 **Move history tracking** - Undo/redo any move during the game
- ⚙️ **Settings panel** - Choose which player starts (X or O)
- 📊 **Game statistics** - Track total moves, current turn, and game status
- 🎭 **Smooth animations** - Hover effects, scale transitions, and victory animations
- 📝 **Console logging** - Game progress logged with `useEffect`
- 🎯 **Immutable state updates** - Using spread operator for safe state management
- 🚫 **Smart disabling** - Prevents moves after game ends or on filled squares

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Board.jsx       # Contains 9 Square components in grid layout
│   └── Square.jsx      # Individual cell component with click handler
├── utils/
│   └── gameLogic.js    # Pure functions for winner/draw calculation
├── App.jsx             # Main component with game state and logic
├── main.jsx            # React entry point
├── index.css           # Tailwind imports and custom styles
└── App.css             # Minimal styles (using Tailwind primarily)
```

---

## 🧩 Component Architecture

### `App` Component
- **Top-level component** managing all game state
- Tracks: board state, current player, move history, starting player
- Handles: click events, game reset, move navigation, player switching
- Uses `useState` for state management and `useEffect` for logging

### `Board` Component
- **Container component** for the game grid
- Receives: squares array, click handler, winning squares
- Renders: 9 Square components in a 3x3 grid layout
- Passes: props and callbacks down to Square components

### `Square` Component
- **Presentational component** for individual cells
- Receives: value (X/O/null), onClick handler, win status, disabled status
- Renders: Button with conditional styling based on state
- Features: Hover effects, win highlighting, disabled state

### `gameLogic.js` Utilities
- **Pure functions** for game calculations
- `calculateWinner()` - Checks all winning combinations
- `checkDraw()` - Verifies if board is full with no winner

---

## 🎯 Learning Goals Covered

### React Fundamentals
✅ **useState Hook** - Managing board state, player turns, history  
✅ **useEffect Hook** - Logging game progress and triggering animations  
✅ **Component Design** - Breaking UI into reusable components  
✅ **Props Passing** - Parent-to-child data flow  
✅ **Callback Props** - Child-to-parent event handling  
✅ **Lifting State** - State in parent, controlled by children  

### JavaScript Concepts
✅ **Immutable Updates** - Using spread operator for state  
✅ **Array Methods** - map, filter, every, slice  
✅ **Pure Functions** - Winner calculation with no side effects  
✅ **Conditional Rendering** - Dynamic UI based on game state  
✅ **Event Handling** - Click handlers with preventDefault  

### Styling
✅ **Tailwind CSS** - Utility-first styling approach  
✅ **Responsive Design** - Mobile-first layout  
✅ **Animations** - Transitions, hover effects, scale transforms  
✅ **Grid Layout** - CSS Grid for board structure  
✅ **Conditional Classes** - Dynamic styling based on state  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd tic-tac-toe-cursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Start playing!

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎮 How to Play

1. **Choose Starting Player** - Click X or O in the settings panel
2. **Make Moves** - Click any empty square to place your symbol
3. **Win Condition** - Get 3 in a row (horizontal, vertical, or diagonal)
4. **Draw** - All squares filled with no winner
5. **Use History** - Click any move in the history panel to jump back
6. **Reset** - Click "Reset Game" to start fresh

---

## 🎨 Tailwind CSS Customization

### Color Scheme
- **X Player**: Blue (`text-blue-500`)
- **O Player**: Red (`text-red-500`)
- **Win Highlight**: Green (`bg-green-200`, `border-green-500`)
- **Background**: Gradient from blue to purple to pink

### Responsive Breakpoints
- **Mobile**: Single column layout
- **Desktop (lg:)**: Side-by-side layout with board and panels

### Custom Animations
- **Hover**: Scale transform and shadow on squares
- **Victory**: Bounce animation on winner message
- **Win Squares**: Scale up and green highlight
- **Buttons**: Smooth transitions on all interactive elements

---

## 🧪 Testing the Game

Try these scenarios:
1. **Win in a row** - X: 0,1,2
2. **Win in column** - O: 0,3,6
3. **Win diagonal** - X: 0,4,8
4. **Draw game** - Fill all squares with no winner
5. **Undo move** - Use history to go back
6. **Change starter** - Switch starting player mid-game

---

## 🔧 Configuration

### Vite Config
Located in `vite.config.js` - handles React plugin and build settings

### ESLint Config
Located in `eslint.config.js` - enforces code quality and React best practices

### Tailwind CSS
Tailwind v4 uses CSS imports in `index.css` - no separate config file needed

---

## 📚 Code Highlights

### Immutable State Update
```javascript
const newSquares = [...squares];
newSquares[index] = isXNext ? 'X' : 'O';
setSquares(newSquares);
```

### Winner Calculation
```javascript
const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];
```

### Conditional Styling
```javascript
className={`
  ${value === 'X' ? 'text-blue-500' : 'text-red-500'}
  ${isWinning ? 'bg-green-200' : 'bg-white'}
  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
`}
```

---

## 🚀 Future Enhancements

Potential features to add:
- [ ] **AI opponent** - Single player mode with computer
- [ ] **Score tracking** - Keep track of wins across multiple games
- [ ] **Player names** - Customize X and O labels
- [ ] **Sound effects** - Audio feedback for moves and wins
- [ ] **Themes** - Light/dark mode toggle
- [ ] **Online multiplayer** - Play with friends remotely
- [ ] **Leaderboard** - Track best players
- [ ] **Difficulty levels** - Easy, medium, hard AI

---

## 📖 Learn More

### React 19
- [React Documentation](https://react.dev)
- [useState Hook](https://react.dev/reference/react/useState)
- [useEffect Hook](https://react.dev/reference/react/useEffect)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com)
- [Tailwind v4 Changes](https://tailwindcss.com/docs/v4-beta)

### Vite
- [Vite Guide](https://vite.dev/guide/)

---

## 👨‍💻 Author

Built as a learning project to demonstrate React 19 and Tailwind CSS best practices.

---

## 📝 License

MIT License - Feel free to use this project for learning and teaching!

---

## 🎓 Perfect For

- **Classroom demonstrations** - Teaching React fundamentals
- **First React project** - Beginner-friendly with clear structure
- **Interview prep** - Common React interview challenge
- **Portfolio piece** - Showcase component design skills
- **Learning reference** - Well-commented, clean code

Happy coding! 🚀
