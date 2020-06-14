import React from "react";

export class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <button
        className="square"
        onClick={this.mark.bind(this)}
      >
        {this.state.value}
      </button>
    );
  }

  // Private

  mark() {
    this.setState({value: "X"})
  }
}
