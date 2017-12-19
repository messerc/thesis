const axios = require('axios');

const stressTest = () => {
  axios.post('http://localhost:3000/events')
  .then((res) => {
    setTimeout(() => {
      stressTest();
    }, 100); 
  })
}

stressTest(); 
