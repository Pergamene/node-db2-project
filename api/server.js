const express = require("express");

const carsRouter = require("./carsRouter");

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/cars', carsRouter);

function logger(req, res, next) {
  console.log(`\n=== LOG ===\nRequest method: ${req.method}\nRequest URL: ${req.originalUrl}\nTimestamp: ${new Date()}\n`);

  next();
}

module.exports = server;
