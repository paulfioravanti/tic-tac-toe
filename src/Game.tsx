import React, { useState } from "react";
import { Board } from "./Board";
import { HistoricalMove } from "./HistoricalMove";
import { MaybeNull, Hooks } from "./Types"

export type SquareOccupant = MaybeNull<Player>;
export type HandleClickFn = (square: number) => () => void;

type Player = "X" | "O";
type Move = { squares: SquareOccupant[] };
type History = Move[];
type HandleHistoricalMoveClickFn = (index: number) => void;

const INITIAL_BOARD: SquareOccupant[] = Array(9).fill(null);
const CELLS: number[] = Array.from(INITIAL_BOARD.keys());
const LINES: Readonly<number[][]> = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

export function Game(): JSX.Element {
  const initialHistory = [{ squares: INITIAL_BOARD }];
  const [history, setHistory]: Hooks<History> =
    useState<History>(initialHistory);
  const [stepNumber, setStepNumber]: Hooks<number> = useState<number>(0);
  const [xIsNext, setXIsNext]: Hooks<boolean> = useState<boolean>(true);
  const currentMove: Move = history[stepNumber];
  const status: string = getStatus(currentMove, xIsNext);
  const squares: SquareOccupant[] = currentMove.squares;
  const moves: JSX.Element[] = history.map(renderHistoricalMove.bind(null));

  return (
    <div className="game">
      <div className="game-board">
        <Board
          cells={CELLS}
          squares={squares}
          handleClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );

  // PRIVATE

  function handleClick(square: number): () => void {
    return (): void => {
      const currentHistory: History = history.slice(0, stepNumber + 1);
      const currentMove: Move = currentHistory[currentHistory.length - 1];
      const squares: SquareOccupant[] = currentMove.squares.slice();

      if (calculateWinner(squares) || squares[square]) {
        return;
      }
      squares[square] = nextPlayer(xIsNext);

      setHistory(currentHistory.concat([{ squares: squares }]));
      setStepNumber(currentHistory.length);
      setXIsNext((xIsNext) => !xIsNext);
    }
  }

  function renderHistoricalMove(_move: Move, index: number): JSX.Element {
    const handleHistoricalMoveClick: HandleHistoricalMoveClickFn =
      jumpTo.bind(null, index);

    return (
      <HistoricalMove
        key={index}
        move={index}
        handleClick={handleHistoricalMoveClick}
      />
    );
  }

  function jumpTo(index: number): void {
    setStepNumber(index);
    setXIsNext(index % 2 === 0);
  }
}

// PRIVATE

function calculateWinner(squares: SquareOccupant[]): MaybeNull<Player> {
  for (let i: number = 0, len = LINES.length; i < len; i++) {
    const [a, b, c]: number[] = LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getStatus({ squares }: Move, xIsNext: boolean): string {
  const winner: MaybeNull<Player> = calculateWinner(squares);
  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${nextPlayer(xIsNext)}`;
  }

  return status;
}

function nextPlayer(xIsNext: boolean): Player {
  return xIsNext ? "X" : "O";
}
