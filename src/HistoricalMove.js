import React from "react";

export function HistoricalMove({ move, handleClick }) {
  const description = move ? "Go to move #" + move : "Go to game start";

  return (
    <li>
      <button onClick={handleClick}>
        {description}
      </button>
    </li>
  );
}
