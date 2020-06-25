import React, { useState } from "react";
import { Row } from "./Row";

export function Board({ cells, squares, handleClick }) {
  const [rows] = useState(chunk([...cells], 3));
  const boardRows = rows.map(renderBoardRow.bind(null));

  return (
    <div>
      {boardRows}
    </div>
  );

  function renderBoardRow(row, index) {
    return (
      <Row
        key={index}
        row={row}
        squares={squares}
        handleClick={handleClick}
      />
    );
  }
}

// PRIVATE

function chunk(array, size) {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }
  return chunked;
}
