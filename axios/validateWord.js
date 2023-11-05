import axios from "axios";

export const validateWord = async (word) => {
  const options = {
    method: "GET",
    url: "https://twinword-word-graph-dictionary.p.rapidapi.com/definition/",
    params: { entry: `${word}` },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
      "X-RapidAPI-Host": "twinword-word-graph-dictionary.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.result_msg);
    return response.data.result_msg;
  } catch (error) {
    console.error(error);
  }
};
