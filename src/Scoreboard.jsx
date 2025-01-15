import React from 'react';

export default function ScoreBoard({ score, players }) {
  return (
    <div id="scoreboard-container">
      <h2>Score Board</h2>
      <div id="scoreboard">
        <div class="scoreboard-name left">{players.X}:</div>
        <div id="score">
          <span>{score[players.X]} </span>
          <span>{score[players.O]}</span>
        </div>
        <div class="scoreboard-name right">:{players.O}</div>
      </div>
    </div>
  );
}
