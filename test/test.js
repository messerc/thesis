const axios = require("axios");
const chai = require("chai");
const { assert, expect, should } = chai;

const { Events } = require("../db/events.js");

describe("Events DB", function() {
  describe("#findOne", function() {
    it("should return something on a simple query", function() {
      Events.findOne().then(record => {
        assert.exists(record);
      });
    });

    it("should return an event on a simple query", function() {
      Events.findOne().then(record => {
        expect(record.eventType).to.exist;
      });
    });
  });
  describe("POST events", function() {
    after(function() {
      Events.remove({ where: { eventType: "test" } });
    });
    it("should insert 100 records into the database at a time", function() {
      let messages = [];
      for (let i = 0; i < 100; i++) {
        messages.push({
          createdAt: new Date('2016', '01', '01'), 
          eventType: 'test',
          userId: 'test',
          listingId: 'test',
          experienceId: 'test'
        });
      }
      axios.post('http://localhost:3000/events', {Body: JSON.stringify(messages)})
      .then(val => expect(val).to.equal("finished writing 100 records"));
    });
    it("should retrieve written 100 records test events", function() {
      Events.find({ where: { eventType: "test" } }).then(val => {
        expect(val.length).to.equal(100);
      });
    });
    it("should retrieve test events", function() {
      Events.find({ where: { eventType: "test" } }).then(val => {
        expect(val[0].eventType).to.equal("test"); 
      });
    });
  });
  describe("GET events", function() {
    it("should retrieve an event from the DB", function() {
      axios.get('http://localhost:3000/events')
      .then(value => {
        expect.value.to.be(true); 
        expect.value.eventType.to.exist; 
      })
    });
  });
});
