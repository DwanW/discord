var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://random-words-with-pronunciation.p.rapidapi.com/word",
  headers: {
    "x-rapidapi-key": process.env.RAPID_KEY,
    "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com",
  },
};

var options2 = {
  method: "GET",
  url: "https://random-word-api.herokuapp.com/word",
};

const getRandomWordWithDefinition = async () => {
  try {
    const response = await axios.request(options);
    //.definition .pronunciation .word
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

const getRandomWord = async () => {
  try {
    const response = await axios.request(options2);
    //.definition .pronunciation .word
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getRandomWordWithDefinition, getRandomWord };
