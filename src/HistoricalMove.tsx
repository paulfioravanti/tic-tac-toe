import React from "react";
import { HandleMouseClickFn } from "./Types";

type Props = {
  key: number,
  move: number,
  handleClick: HandleMouseClickFn
}

export function HistoricalMove({ move, handleClick }: Props): JSX.Element {
  const description: string = move ? "Go to move #" + move : "Go to game start";

  return (
    <li>
      <button onClick={handleClick}>
        {description}
      </button>
    </li>
  );
}
