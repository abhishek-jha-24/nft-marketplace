
var express = require("express");
var authRouter = require("./auth");
var userRouter = require("./user");
var assetRouter = require('./asset');
var auctionRouter = require('./auction');

var app = express();

app.use("/user/", userRouter);
app.use('/assets',assetRouter);
app.use('/auction',auctionRouter);
module.exports = app;
