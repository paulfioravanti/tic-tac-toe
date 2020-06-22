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
    const { squares, onClick } = this.props;
    const key = `square-${index}`;
    const value = squares[square];
    const handleClick = onClick.bind(this, square);

    return (
      <Square
        key={key}
        value={value}
        onClick={handleClick}
      />
    );
  }
}
