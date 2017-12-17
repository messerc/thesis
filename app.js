const apm = require('elastic-apm-node').start({
  appName: 'thesis'
});
const express = require('express');
const { Events } = require('./db/events.js');

const app = express();

app.post('/events', (req, res) => {
  const readTest = (n) => {
    if (n === 0) {
      console.log('all done');
      res.end();
    }
    Events.findOne()
    .then(() => {
      readTest(n-1)
    })
  }
  readTest(10000)
});

app.use(apm.middleware.express());

app.listen(3000);

console.log(`listening on port 3000`);