# Ultimate Tic Tac Toe

A modern, interactive Ultimate Tic Tac Toe game built with React, Tailwind CSS, and modern JavaScript.

## 🎮 Game Features

- **9x9 Ultimate Tic Tac Toe** - A 3x3 grid of 3x3 boards
- **Smart Game Rules** - Enforces the "send opponent" rule where your move determines where your opponent must play next
- **Interactive UI** - Beautiful, responsive design with dark mode support
- **Game Controls** - Undo (limited to 3 times per game) and Restart functionality
- **Real-time Status** - Shows current player, game state, and next move instructions
- **Accessibility** - Proper ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **ES6+ JavaScript** - Modern JavaScript features
- **Custom Hooks** - Separated game logic for maintainability
- **Responsive Design** - Works on all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd modern-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── UltimateTicTacToe.js    # Main game component
│   └── MiniBoard.js            # Individual 3x3 board component
├── hooks/
│   └── useGameLogic.js         # Custom hook for game logic
├── utils/
│   └── gameUtils.js            # Utility functions and constants
├── App.js                      # Root component
└── index.js                    # Entry point
```

## 🎯 How to Play

1. **Game Setup**: The game starts with X's turn
2. **First Move**: X can play anywhere on any board
3. **Subsequent Moves**: Your move determines where your opponent must play next
4. **Board Selection**: The cell position you choose corresponds to the board your opponent must play in
5. **Winning**: Win 3 mini-boards in a row (horizontally, vertically, or diagonally)
6. **Special Rules**: If the target board is already won/full, your opponent can play anywhere

## 🎨 Features

- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Dark Mode**: Automatic dark/light theme support
- **Smooth Animations**: Hover effects and transitions
- **Game History**: Track moves for undo functionality
- **Smart UI**: Highlights active boards and shows game status

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Inspired by the classic Ultimate Tic Tac Toe game
- Designed for modern web development practices
