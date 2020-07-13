import React, { useState } from "react"
import { Row } from "./Row"
import { SquareOccupant, HandleClickFn } from "./Game"
import { Hooks } from "./Types"

type Props = {
  cells: number[],
  squares: SquareOccupant[],
  handleClick: HandleClickFn
};

export function Board({ cells, squares, handleClick }: Props): JSX.Element {
  const [rows]: Hooks<number[][]> = useState<number[][]>(chunk([...cells], 3))
  const boardRows: JSX.Element[] = rows.map(renderBoardRow.bind(null))

  return (
    <div>
      {boardRows}
    </div>
  )

  function renderBoardRow(row: number[], index: number): JSX.Element {
    return (
      <Row
        key={index}
        row={row}
        squares={squares}
        handleClick={handleClick}
      />
    )
  }
}

// PRIVATE

function chunk(array: number[], size: number): number[][] {
  const chunked: number[][] = []
  let index = 0

  while (index < array.length) {
    chunked.push(array.slice(index, size + index))
    index += size
  }

  return chunked
}
