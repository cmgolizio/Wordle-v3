import axios from "axios";

export const getNewWordle = async () => {
  const options = {
    method: "GET",
    url: "https://random-word-api.p.rapidapi.com/L/5",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
      "X-RapidAPI-Host": "random-word-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.word);
    return response.data.word.toUpperCase();
  } catch (error) {
    console.error(error);
  }
};

// export const getNewWordle = () => {
//   let newHeaders = new Headers();
//   newHeaders.append("X-RapidAPI-Key", process.env.NEXT_PUBLIC_X_RAPID_API_KEY);
//   newHeaders.append("X-RapidAPI-Host", "random-word-api.p.rapidapi.com");

//   const requestOptions = {
//     method: "GET",
//     headers: newHeaders,
//     redirect: "follow",
//   };

//   fetch("https://random-word-api.p.rapidapi.com/L/5", requestOptions)
//     .then((response) => response.json())
//     .then(
//       (result) => {
//         console.log("FROM getNewWordle.js: ", result.word);
//         return result.word.toUpperCase();
//       },
//       (error) => console.log("error", error)
//     );
// };
