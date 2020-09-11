var createError = require("http-errors");
var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");

var compression = require("compression");
var helmet = require("helmet");

var app = express();

// used for compressing http responses
app.use(compression());

// protects from web vulnerabilities
app.use(helmet());

app.use("/", indexRouter);

module.exports = app;
