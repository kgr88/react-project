import Player from './Player';
import GameBoard from './GameBoard';
import './index.css';
import { useState } from 'react';
import Log from './Log.jsx';
import { WINNING_COMBINATIONS } from './WinningCombinations.js';
import GameOver from './GameOver.jsx';
import ScoreBoard from './Scoreboard.jsx';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thisSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thisSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard].map(array => [...array]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export default function App() {
  const [players, setPlayers] = useState({
    X: 'MissW',
    O: 'MisterQ',
  });

  const [score, setScore] = useState({ [players.X]: 0, [players.O]: 0 });
  const [gameTurns, setGameTurns] = useState([]);
  const [history, setHistory] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex) {
    setHistory(prevHistory => [gameTurns, ...prevHistory]);
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
    setHistory([]);
  }

  function handleUndo() {
    if (history.length > 0) {
      const previousTurns = history[0];
      setGameTurns(previousTurns);
      setHistory(prevHistory => prevHistory.slice(1));
    }
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      const updatedPlayers = { ...prevPlayers, [symbol]: newName };
      setScore({ [updatedPlayers.X]: 0, [updatedPlayers.O]: 0 });
      return updatedPlayers;
    });
  }

  return (
    <main>
      <ScoreBoard players={players} score={score}></ScoreBoard>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="MissW"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}></Player>
          <Player
            initialName="MisterQ"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} score={score} setScore={setScore} players={players} />
        )}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard}></GameBoard>
        <div class="undo">
          <button onClick={handleUndo} disabled={history.length === 0}>
            Undo
          </button>
        </div>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
