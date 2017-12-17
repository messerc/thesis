const mongoose = require('mongoose');
const moment = require('moment');

const { Events } = require('./events.js');

let length = 28000

let userId = 0;
let listingId = 0;
let experienceId = 0;

const startTime = moment();

const batchUpload = (days, day) => {
  if (days === 0) {
    console.log('all done!');
    const endTime = moment();
    console.log('it took ' + endTime.diff(startTime, 'seconds') + ' seconds'); 
    process.exit(); 
  }
  let events = [];
  for (let i = 0; i < length; i++) {
    let chanceValue = Math.floor(Math.random() * 100); 
    if (length < 14001) {
      events.push(new Events({
        createdAt: day,
        eventType: 'view',
        userId,
        listingId,
        experienceId,
      })); 
      if (chanceValue < 11) {
        events.push(new Events({
          createdAt: day,
          eventType: 'book',
          userId,
          listingId,
          experienceId
        }))
      }
    } else {
      events.push(new Events({
        createdAt: day,
        eventType: 'view',
        userId,
        listingId
      }));
      if (chanceValue < 5) {
        events.push(new Events({
          createdAt: day,
          eventType: 'book',
          userId,
          listingId
        }));
      }
    }
    userId++;
    listingId++;
    experienceId++;
  }
  Events.insertMany(events).then(events => {
    console.log('all done inserting ' + events.length + ' events for day ' + day.format('MM-DD-YYYY'));
    batchUpload(days-1, day.add(1, 'days'));
  }); 
}

batchUpload(365, moment('2017-01-01'));