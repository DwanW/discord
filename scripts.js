var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://random-words-with-pronunciation.p.rapidapi.com/word",
  headers: {
    "x-rapidapi-key": process.env.RAPID_KEY,
    "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com",
  },
};

const getRandomWord = async () => {
  try {
    const response = await axios.request(options);
    //.definition .pronunciation .word
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getRandomWord };
