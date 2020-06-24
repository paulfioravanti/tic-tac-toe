import React from "react";
import { Square } from "./Square";

export function Row(props) {
  const squares = renderSquares(props);

  return (
    <div className="board-row">
      {squares}
    </div>
  );
}

// PRIVATE

function renderSquares({ row, squares, handleClick }) {
  return row.map(renderSquare.bind(null, squares, handleClick));
}

function renderSquare(squares, handleClick, square, index) {
  const key = `square-${index}`;
  const value = squares[square];
  const handleSquareClick = handleClick.bind(null, square);

  return (
    <Square
      key={key}
      value={value}
      handleClick={handleSquareClick}
    />
  );
}
