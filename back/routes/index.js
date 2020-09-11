var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("nothing");
});

router.get("/getBtcPrice", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(data => data.json())
    .then(jsonData => {
      res.type("json");
      res.send(jsonData);
    });
});
router.get("/getAvailableCurrencies", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch("https://api.coindesk.com/v1/bpi/supported-currencies.json")
    .then(data => data.json())
    .then(jsonData => {
      res.type("json");
      res.send(jsonData);
    });
});
router.get("/getCurrencyBtcPrice/:curr", (req, res) => {
  const currency = req.params.curr;
  res.header("Access-Control-Allow-Origin", "*");
  fetch("https://api.coindesk.com/v1/bpi/currentprice/" + currency)
    .then(data => data.json())
    .then(jsonData => {
      res.type("json");
      res.send(jsonData);
    });
});
router.get("/getCurrencyHistoricalBtcPrice/:curr", (req, res) => {
  const currency = req.params.curr;
  res.header("Access-Control-Allow-Origin", "*");
  fetch(
    "https://api.coindesk.com/v1/bpi/historical/close.json?currency=" + currency
  )
    .then(data => data.json())
    .then(jsonData => {
      res.type("json");
      res.send(jsonData);
    });
});

module.exports = router;
