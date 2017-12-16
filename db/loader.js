const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/thesis'
mongoose.connect(mongoDB, { useMongoClient: true});
var moment = require('moment');

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const eventsSchema = mongoose.Schema({
  eventType: String,
  userId: String,
  createdAt: Date,
  listingId: String,
  experienceId: String
});
const Events = mongoose.model('Events', eventsSchema);

let length = 1000

let userId = 0;
let listingId = 0;
let experienceId = 0;

let types = ['view', 'book', 'create', 'delete']; 
const startTime = moment();

const batchUpload = (n) => {
  if (n === 0) {
    console.log('all done!');
    const endTime = moment();
    console.log('it took ' + endTime.diff(startTime, 'seconds') + ' seconds'); 
    process.exit(); 
  }
  let events = [];
  for (let i = 0; i < length; i++) {
    console.log(i);
    let randomChar = Math.floor(Math.random() * 4) 
    events.push(new Test({
      eventType: types[randomChar],
      userId,
      createdAt: moment(),
      listingId,
      experienceId,
    })); 
    userId++;
    listingId++;
    experienceId++;
  }
  Test.insertMany(tests).then(events => {
    console.log('all done inserting ' + events.length + ' events')
    batchUpload(n-1);
  }); 
}