import React, {Component} from 'react';
import './Square.css';

export default class Square extends Component {
  render() {
    return (
      <button
        className={`square square--${this.props.bgStyle}`}
        type='button'
        style={this.props.style}
        onClick={() => this.props.onClick(this.props.row, this.props.col)}
      >
      </button>
    );
  }
}