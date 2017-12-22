const chai = require('chai');
const { assert, expect, should } = chai; 

const { Events } = require('../db/events.js');


describe('Events DB', function() {

  describe('#findOne', function() {
    it('should return an event on a simple query', function() {
      Events.findOne()
      .then(record => {
        assert.exists(record); 
      });
    })
  });

  

});
