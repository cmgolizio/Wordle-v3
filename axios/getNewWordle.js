import axios from "axios";

export const getNewWordle = async () => {
  const options = {
    method: "GET",
    url: "https://wordsapiv1.p.rapidapi.com/words/",
    params: { random: "true", letters: 5 },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const result = {
      word: response.data.word.toUpperCase(),
      definition: response.data.results[0].definition,
    };
    return result;
  } catch (error) {
    console.error(error);
  }
};
