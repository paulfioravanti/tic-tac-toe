import React from "react";

export function HistoricalMove(props) {
  const move = props.move;
  const description = move ? "Go to move #" + move : "Go to game start";

  return (
    <li>
      <button onClick={props.onClick}>
        {description}
      </button>
    </li>
  );
}
