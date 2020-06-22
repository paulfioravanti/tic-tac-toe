import React from "react";
import { Square } from "./Square";

export class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }

  // PRIVATE

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={this.props.onClick.bind(this, i)}
      />
    );
  }
}

// export class Board extends React.Component {
//   // static INITIAL_BOARD = Array(9).fill(null)
//   // static CELLS = Board.chunk([...Board.INITIAL_BOARD.keys()], 3)
//   // static LINES = [
//   //   [0, 1, 2],
//   //   [3, 4, 5],
//   //   [6, 7, 8],
//   //   [0, 3, 6],
//   //   [1, 4, 7],
//   //   [2, 5, 8],
//   //   [0, 4, 8],
//   //   [2, 4, 6],
//   // ];

//   // static chunk(array, size) {
//   //   const chunked = [];
//   //   let index = 0;
//   //   while (index < array.length) {
//   //     chunked.push(array.slice(index, size + index));
//   //     index += size;
//   //   }
//   //   return chunked;
//   // }

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
//       squares: Board.INITIAL_BOARD,
//       cells: Utils.chunk([...Board.INITIAL_BOARD.keys()], 3),
//       xIsNext: true
//     };
//   }

//   render() {
//     return (
//       <div>
//         <div className="status">
//           {this.status()}
//         </div>
//         {this.renderBoardRows()}
//       </div>
//     );
//   }

//   // PRIVATE

//   status() {
//     const winner = Utils.calculateWinner(this.state.squares);
//     let status;

//     if (winner) {
//       status = `Winner: ${winner}`;
//     } else {
//       status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
//     }

//     return status;
//   }

//   renderBoardRows() {
//     return this.state.cells.map((row) => this.renderBoardRow(row))
//   }

//   renderBoardRow([a, b, c]) {
//     return (
//       <div className="board-row">
//         {this.renderSquare(a)}
//         {this.renderSquare(b)}
//         {this.renderSquare(c)}
//       </div>
//     );
//   }

//   renderSquare(i) {
//     return (
//       <Square
//         value={this.props.squares[i]}
//         // onClick={this.handleClick.bind(this, i)}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   // handleClick(i) {
//   //   const squares = this.state.squares.slice();
//   //   if (squares[i] || Board.calculateWinner(squares)) {
//   //     return;
//   //   }

//   //   const xIsNext = this.state.xIsNext
//   //   squares[i] = xIsNext ? "X" : "O";
//   //   this.setState({
//   //     squares: squares,
//   //     xIsNext: !xIsNext
//   //   });
//   // }
// }
