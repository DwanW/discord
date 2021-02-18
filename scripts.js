var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://random-words-with-pronunciation.p.rapidapi.com/word",
  headers: {
    "x-rapidapi-key": "866cb11a13msh4c026d31f9bc393p1d7168jsn1a054d796389",
    "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com",
  },
};

const getRandomWord = async () => {
  try {
    const response = await axios.request(options);
    //.definition .pronunciation
    return response.data[0].word;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getRandomWord };
