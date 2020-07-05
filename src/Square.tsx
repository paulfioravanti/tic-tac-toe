import React from "react";
import { SquareOccupant } from "./Game";
import { HandleSquareClickFn } from "./Row";

type Props = {
  handleClick: HandleSquareClickFn,
  value: SquareOccupant
};

export function Square({ handleClick, value }: Props) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
