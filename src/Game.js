import React from "react";
import { Board } from "./Board";
import { HistoricalMove } from "./HistoricalMove";

export class Game extends React.Component {
  static INITIAL_BOARD = Array(9).fill(null);
  static CELLS = Game.INITIAL_BOARD.keys();
  static LINES = Object.freeze([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  static calculateWinner(squares) {
    const lines = Game.LINES;
    for (let i = 0, len = lines.length; i < len; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  static status(current, xIsNext) {
    const winner = Game.calculateWinner(current.squares);
    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${Game.nextPlayer(xIsNext)}`;
    }

    return status;
  }

  static nextPlayer(xIsNext) {
    return xIsNext ? "X" : "O";
  }

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Game.INITIAL_BOARD
      }],
      stepNumber: 0,
      xIsNext: true,
      cells: Game.CELLS,
      onClick: this.handleClick.bind(this)
    };
  }

  render() {
    const { history, cells, onClick, stepNumber, xIsNext } = this.state;
    const currentState = history[stepNumber];
    const moves = history.map(this.renderHistoricalMove.bind(this));
    const status = Game.status(currentState, xIsNext);
    const squares = currentState.squares;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            cells={cells}
            onClick={onClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  // PRIVATE

  handleClick(square) {
    const { history, stepNumber, xIsNext } = this.state;
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentState = currentHistory[currentHistory.length - 1];
    const squares = currentState.squares.slice();

    if (Game.calculateWinner(squares) || squares[square]) {
      return;
    }
    squares[square] = Game.nextPlayer(xIsNext);

    this.setState({
      history: currentHistory.concat([{
        squares: squares
      }]),
      stepNumber: currentHistory.length,
      xIsNext: !xIsNext
    });
  }

  renderHistoricalMove(_move, index) {
    const handleClick = this.jumpTo.bind(this, index)

    return (
      <HistoricalMove
        key={index}
        move={index}
        onClick={handleClick}
      />
    );
  }

  jumpTo(index) {
    this.setState({
      stepNumber: index,
      xIsNext: (index % 2) === 0
    });
  }
}
