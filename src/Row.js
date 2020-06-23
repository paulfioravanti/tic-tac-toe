import React from "react";
import { Square } from "./Square";

export class Row extends React.Component {
  render() {
    const squares = this.renderSquares();

    return (
      <div className="board-row">
        {squares}
      </div>
    );
  }

  // PRIVATE

  renderSquares() {
    return this.props.row.map(this.renderSquare.bind(this));
  }

  renderSquare(square, index) {
    const { squares, handleClick } = this.props;
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
}
