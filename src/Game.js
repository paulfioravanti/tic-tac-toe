import React, { useState } from "react";
import { Board } from "./Board";
import { HistoricalMove } from "./HistoricalMove";

const INITIAL_BOARD = Array(9).fill(null);
const CELLS = INITIAL_BOARD.keys();
const LINES = Object.freeze([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]);

export function Game(props) {
  const [history, setHistory] = useState([{ squares: INITIAL_BOARD }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = setHandleClick.bind(null);
  const currentState = history[stepNumber];
  const moves = history.map(renderHistoricalMove.bind(null));
  const status = getStatus(currentState, xIsNext);
  const squares = currentState.squares;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          cells={CELLS}
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

  function setHandleClick(square) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentState = currentHistory[currentHistory.length - 1];
    const squares = currentState.squares.slice();

    if (calculateWinner(squares) || squares[square]) {
      return;
    }
    squares[square] = nextPlayer(xIsNext);

    setHistory(currentHistory.concat([{ squares: squares }]));
    setStepNumber(currentHistory.length);
    setXIsNext((xIsNext) => !xIsNext);
  }

  function renderHistoricalMove(_move, index) {
    const handleHistoricalMoveClick = jumpTo.bind(null, index)

    return (
      <HistoricalMove
        key={index}
        move={index}
        handleClick={handleHistoricalMoveClick}
      />
    );
  }

  function jumpTo(index) {
    setStepNumber(index);
    setXIsNext(index % 2 === 0);
  }
}

// PRIVATE

function calculateWinner(squares) {
  for (let i = 0, len = LINES.length; i < len; i++) {
    const [a, b, c] = LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getStatus(currentState, xIsNext) {
  const winner = calculateWinner(currentState.squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${nextPlayer(xIsNext)}`;
  }

  return status;
}

function nextPlayer(xIsNext) {
  return xIsNext ? "X" : "O";
}
