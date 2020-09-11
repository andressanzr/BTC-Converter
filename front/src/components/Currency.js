import React, { Component } from "react";

export class Currency extends Component {
  render() {
    return (
      <>
        <option value={this.props.curren}>{this.props.curren}</option>
      </>
    );
  }
}

export default Currency;
