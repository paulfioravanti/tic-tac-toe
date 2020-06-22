import React from "react";
import { Row } from "./Row";

export class Board extends React.Component {
  static chunk(array, size) {
    const chunked = [];
    let index = 0;
    while (index < array.length) {
      chunked.push(array.slice(index, size + index));
      index += size;
    }
    return chunked;
  }

  constructor(props) {
    super(props);
    this.state = {
      rows: Board.chunk([...this.props.cells], 3)
    }
  }

  render() {
    const rows = this.renderBoardRows();

    return (
      <div>
        {rows}
      </div>
    );
  }

  // PRIVATE

  renderBoardRows() {
    return this.state.rows.map(this.renderBoardRow.bind(this));
  }

  renderBoardRow(row, index) {
    const { squares, onClick } = this.props;
    const key = `row-${index}`;

    return (
      <Row
        key={key}
        row={row}
        squares={squares}
        onClick={onClick}
      />
    );
  }
}
