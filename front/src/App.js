import React, { Component } from "react";
import { Chart } from "chart.js";
import CurrencyList from "./components/CurrencyList";

class App extends Component {
  constructor(props) {
    super(props);
    window.myChart = "";
  }
  state = {
    availableCurrencies: [],
    currencyAmountInput: 1,
    currentBTCval: "",
    displayCurrencyValue: "",
    historicalCurrVal: "",
  };
  componentDidMount() {
    fetch("http://localhost:3030/getAvailableCurrencies")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({ ...this.state, availableCurrencies: data });
      });
  }
  componentDidUpdate() {
    console.log("updated");
  }
  handleNumberChange = (e) => {
    this.setState({ ...this.state, currencyAmountInput: e.target.value });
  };
  handleCurrencyChange = (e) => {
    var curr = e.target.value;
    fetch("http://localhost:3030/getCurrencyBtcPrice/" + curr)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        var currentBtcValKey = Object.keys(data.bpi);
        var displayNum =
          data.bpi[currentBtcValKey[1]].rate_float *
          this.state.currencyAmountInput;
        this.setState({
          ...this.state,
          currentBTCval: data,
          displayCurrencyValue: displayNum,
        });
      });
    fetch("http://localhost:3030/getCurrencyHistoricalBtcPrice/" + curr)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({
          ...this.state,
          historicalCurrVal: data,
        });
        this.paintBtcCanvas();
      });
  };
  paintBtcCanvas = () => {
    // get actual currency
    var actualCurrencyKeys = this.state.currentBTCval.bpi
      ? Object.keys(this.state.currentBTCval.bpi)
      : "";
    var actualCurrency = actualCurrencyKeys
      ? this.state.currentBTCval.bpi[actualCurrencyKeys[1]].code
      : "";
    // end get actual currency

    var data = this.state.historicalCurrVal;

    var bpiKeys;

    var priceList;
    if (data) {
      bpiKeys = data ? Object.keys(data.bpi) : "";

      priceList = Object.values(data.bpi);

      var ctx = document.getElementById("myBtcChart").getContext("2d");

      var config = {
        type: "line",
        data: {
          labels: bpiKeys,
          datasets: [
            {
              label: "BTC price",
              data: priceList,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "BTC price Index currency: " + actualCurrency,
          },
        },
      };
      if (window.myChart != "") {
        window.myChart.destroy();
        console.log("borrado");
      }
      var myChart = new Chart(ctx, config);
      window.myChart = myChart;
    }
  };

  render() {
    var currentBtcValKeys = this.state.currentBTCval
      ? Object.keys(this.state.currentBTCval.bpi)
      : "";
    return (
      <>
        <div className="container col-4">
          <h1>Full-stack app with Node & React</h1>
          <h3>
            BTC prices converter
            {" " +
              (this.state.currentBTCval
                ? "to " +
                  this.state.currentBTCval.bpi[currentBtcValKeys[1]].description
                : "")}
          </h3>

          <div>
            <input
              type="number"
              defaultValue="1"
              min="0"
              className="form-control"
              onChange={this.handleNumberChange}
            />
            <select onChange={this.handleCurrencyChange}>
              <CurrencyList currencyList={this.state.availableCurrencies} />
            </select>
            <p style={({ fontWeight: "bold" }, { fontSize: "2em" })}>
              {(
                this.state.displayCurrencyValue * this.state.currencyAmountInput
              ).toLocaleString() + " "}{" "}
              {this.state.currentBTCval
                ? this.state.currentBTCval.bpi[currentBtcValKeys[1]].code
                : ""}
            </p>
          </div>
        </div>
        <div className="container">
          <canvas id="myBtcChart" width="850" height="500" />
        </div>
      </>
    );
  }
}

export default App;
