import { useEffect } from 'react';
export default function GameOver({ winner, onRestart, setScore, players }) {
  useEffect(() => {
    if (winner) {
      if (winner === players.X) {
        console.log('Updating score for', players.X);
        setScore(prevScore => ({ ...prevScore, [players.X]: prevScore[players.X] + 1 }));
      } else if (winner === players.O) {
        console.log('Updating score for', players.O);
        setScore(prevScore => ({ ...prevScore, [players.O]: prevScore[players.O] + 1 }));
      }
    }
  }, [winner, setScore]);

  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p> {winner} won! </p>}
      {!winner && <p> It is a draw! </p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
