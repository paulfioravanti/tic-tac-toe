import React from "react";
import { Board } from "./Board";
import { Utils } from "./Utils";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (Utils.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = Utils.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// export class Game extends React.Component {
//   static INITIAL_BOARD = Array(9).fill(null)

//   // static calculateWinner(squares) {
//   //   for (let i = 0, len = Board.LINES.length; i < len; i++) {
//   //     const [a, b, c] = Board.LINES[i];
//   //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//   //       return squares[a];
//   //     }
//   //   }
//   //   return null;
//   // }

//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Game.INITIAL_BOARD
//       }],
//       xIsNext: true
//     };
//   }

//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//             squares={current.squares}
//             onClick={(i) => this.handleClick(i)}
//            />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }

//   handleClick(i) {
//     const history = this.state.history;
//     const xIsNext = this.state.xIsNext;
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if (squares[i] || Utils.calculateWinner(squares)) {
//       return;
//     }

//     squares[i] = xIsNext ? "X" : "O";
//     this.setState({
//       history: history.concat([{ squares: squares }]),
//       xIsNext: !xIsNext
//     });
//   }
// }
