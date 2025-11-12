# Tic-Tac-Toe Game

An interactive Tic-Tac-Toe game built with React 19 and Tailwind CSS using Vite.

## Features

- 🎮 Interactive gameplay with X and O symbols
- 🏆 Automatic winner detection (rows, columns, diagonals)
- 🔄 Game reset functionality
- 📱 Responsive design with Tailwind CSS
- 🎨 Clean and modern UI with hover effects
- 📊 Game status display (current player, winner, draw)

## Tech Stack

- **React 19** - Latest React version with modern features
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **JavaScript (JSX)** - Component-based architecture

## Game Logic

- Players alternate between X and O
- Click on empty squares to place your symbol
- Win by getting 3 symbols in a row (horizontal, vertical, or diagonal)
- Game ends in a draw if all squares are filled without a winner
- Reset button clears the board for a new game

## Component Structure

```
src/
├── App.jsx          # Main game component with state management
├── components/
│   ├── Board.jsx    # Game board with 9 squares
│   └── Square.jsx   # Individual square component
└── index.css        # Tailwind CSS imports and global styles
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided localhost URL

## Learning Goals

This project demonstrates:
- React state management with `useState`
- Component composition and prop passing
- Event handling and user interaction
- Conditional rendering
- Pure functions for game logic
- Modern CSS with Tailwind utilities
- Responsive design principles

## Game Rules

1. X always goes first
2. Players take turns clicking on empty squares
3. The first player to get 3 of their symbols in a row wins
4. If all 9 squares are filled without a winner, the game is a draw
5. Click "Reset Game" to start a new round

Enjoy playing! 🎯