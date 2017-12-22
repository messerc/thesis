const AWS = require("aws-sdk");
const moment = require("moment"); 
// Set the region
AWS.config.loadFromPath("./config.json");

// Create an SQS service object
const sqs = new AWS.SQS();

const params = {
  QueueUrl: "https://sqs.us-east-2.amazonaws.com/669306556214/events"
};

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      let messages = [];
      for (let i = 0; i < 100; i++) {
        messages.push({
          createdAt: moment('2016-01-01'),
          eventType: 'view',
          userId: 78,
          listingId: 800,
          experienceId: 900
        });
      }
      params.MessageBody = JSON.stringify(messages);
      sqs.sendMessage(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      });
    }
  }, 50);
}
