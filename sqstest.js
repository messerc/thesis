var AWS = require("aws-sdk");
// Set the region
AWS.config.loadFromPath("./config.json");

// Create an SQS service object
var sqs = new AWS.SQS();

var params = {
  QueueUrl: "https://sqs.us-east-2.amazonaws.com/669306556214/events"
};

let length = 100; 

while (length) {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      let messages = [];
      for (let i = 0; i < 100; i++) {
        messages.push({
          id: 1,
          text: "This is a test message"
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
  length--; 
}
