import { useState, useEffect } from 'react';
export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setPlayerName(initialName);
  }, [initialName]);

  function handleEdit() {
    setIsEditing(editing => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = <input type="text" required defaultValue={playerName} onChange={handleChange} />;
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
    console.log(event.target.value);
    //we will get the pointer to the event
    //argument will be given as object
    //it has target property and it has value property
  }
  return (
    <>
      <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}> {isEditing ? 'Save' : 'Edit'}</button>
      </li>
    </>
  );
}
