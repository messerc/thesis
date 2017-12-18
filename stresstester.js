const axios = require('axios');

const stressTest = () => {
  axios.post('http://localhost:3000/events')
  .then((res) => {
    stressTest();
  })
}

stressTest(); 
