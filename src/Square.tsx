import React from "react";
import { SquareOccupant } from "./Game";
import { HandleMouseClickFn } from "./Types";

type Props = {
  handleClick: HandleMouseClickFn,
  value: SquareOccupant
};

export function Square({ handleClick, value }: Props) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
