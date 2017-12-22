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
  describe("#insert", function() {
    after(function() {
      Events.remove({where: {"eventType": "test"}}); 
    })
    it("should insert a record into the database", function() {
      let testEvent = new Events({
        createdAt: new Date("2016, 01, 01"),
        eventType: "test",
        userId: "test",
        listingId: "test",
        experienceId: "test"
      });
      testEvent.save().then(val => {
        expect(val).to.exist;
      });
    });
    it("should retrieve written record from database", function() {
      Events.findOne({where: {"eventType": "test"}})
      .then(val => {
        expect(val.eventType).to.equal("test");
      })
    });
  });
});
