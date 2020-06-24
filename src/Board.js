import React, { useState } from "react";
import { Row } from "./Row";

export function Board(props) {
  const [rows] = useState(initRows(props));
  const boardRows = renderBoardRows(rows, props);

  return (
    <div>
      {boardRows}
    </div>
  );
}

// PRIVATE

function initRows({ cells }) {
  return chunk([...cells], 3);
}

function chunk(array, size) {
  const chunked = [];
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }
  return chunked;
}

function renderBoardRows(rows, props) {
  return rows.map(renderBoardRow.bind(null, props));
}

function renderBoardRow({ squares, handleClick }, row, index) {
  const key = `row-${index}`;

  return (
    <Row
      key={key}
      row={row}
      squares={squares}
      handleClick={handleClick}
    />
  );
}
