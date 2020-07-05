import React from "react";
import { SquareOccupant, HandleClickFn } from "./Game";
import { Square } from "./Square";

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

function renderSquares({ row, squares, handleClick }: Props) {
  return row.map(renderSquare.bind(null, squares, handleClick));
}

function renderSquare(
  squares: SquareOccupant[],
  handleClick: HandleClickFn,
  square: number,
  index: number
) {
  const key: string = `square-${index}`;
  const value: SquareOccupant = squares[square];
  const handleSquareClick: HandleClickFn = handleClick.bind(null, square);

  return (
    <Square
      key={key}
      value={value}
      handleClick={handleSquareClick}
    />
  );
}
