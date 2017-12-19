const apm = require("elastic-apm-node").start({
  appName: "thesis"
});
const axios = require('axios');
const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const Consumer = require("sqs-consumer");
const moment = require("moment");
const { Events } = require("./db/events.js");

AWS.config.loadFromPath("./config.json");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const poll = Consumer.create({
  queueUrl: "https://sqs.us-east-2.amazonaws.com/669306556214/events",
  batchSize: 10,
  handleMessage: (message, done) => {
    axios.post('http://localhost:3000/events', message)
    .then(() => {
      done();     
    }); 
  }
});
poll.start(); 

app.post("/events", (req, res) => {
  console.log('a new batch of messages in da queue');
  console.log(JSON.parse(req.body.Body));
  const events = [];
  for (let i = 0; i < 1000; i++) {
    events.push(
      new Events({
        createdAt: moment("2016-01-01"),
        eventType: "view",
        userId: "Test",
        listingId: "Test"
      })
    );
  }
  Events.insertMany(events).then(events => {
    res.send("finished writing 1000 records");
  });
});

app.use(apm.middleware.express());

app.listen(3000);

console.log(`listening on port 3000`);
