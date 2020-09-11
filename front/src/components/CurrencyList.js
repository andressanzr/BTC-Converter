import React, { Component } from "react";
import Currency from "./Currency";

export class CurrencyList extends Component {
  render() {
    return (
      <>
        {this.props.currencyList.map(curr => {
          return <Currency curren={curr.currency} key={curr.currency} />;
        })}
      </>
    );
  }
}

export default CurrencyList;
