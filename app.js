const apm = require('elastic-apm-node').start({
  appName: 'thesis'
});
const express = require('express');
const moment = require('moment');
const { Events } = require('./db/events.js');

const app = express();

app.post('/events', (req, res) => {
  const events = [];
  for (let i = 0; i < 1000; i++) {
    events.push(new Events({
      createdAt: moment('2016-01-01'),
      eventType: 'view',
      userId: 'Test',
      listingId: 'Test'
    }));
  }
  Events.insertMany(events).then(events => {
    res.send('finished writing 1000 records');
  }); 
});

app.use(apm.middleware.express());

app.listen(3000);

console.log(`listening on port 3000`);