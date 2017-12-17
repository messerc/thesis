const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/thesis'
mongoose.connect(mongoDB, { useMongoClient: true});
var moment = require('moment');

const db = mongoose.connection; 

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const eventsSchema = mongoose.Schema({
  createdAt: Date,
  eventType: String,
  userId: String,
  listingId: String,
  experienceId: String
});
const Events = mongoose.model('Events', eventsSchema);

module.exports = {
  Events
}