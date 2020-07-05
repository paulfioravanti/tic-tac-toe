import React from "react";
import { SquareOccupant, HandleClickFn } from "./Game";
import { Square } from "./Square";
import { HandleMouseClickFn } from "./Types";

type Props = {
  row: number[],
  squares: SquareOccupant[],
  handleClick: HandleClickFn
};

export function Row(props: Props): JSX.Element {
  const squares: JSX.Element[] = renderSquares(props);

  return (
    <div className="board-row">
      {squares}
    </div>
  );
}

// PRIVATE

function renderSquares({ row, squares, handleClick }: Props): JSX.Element[] {
  return row.map(renderSquare.bind(null, squares, handleClick));
}

function renderSquare(
  squares: SquareOccupant[],
  handleClick: HandleClickFn,
  square: number,
  index: number
): JSX.Element {
  const key: string = `square-${index}`;
  const value: SquareOccupant = squares[square];
  const handleSquareClick: HandleMouseClickFn = handleClick(square);

  return (
    <Square
      key={key}
      value={value}
      handleClick={handleSquareClick}
    />
  );
}
