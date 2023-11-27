export const validateLetters = (guess, answer) => {
  // Initialize the result object
  const result = {};

  // Check for same letters at the same index
  for (let i = 0; i < guess.length; i++) {
    if (!answer.includes(guess[i])) {
      result[i] = "error";
    }
    if (guess[i] === answer[i]) {
      result[i] = "correct";
    }
    if (result[i] === undefined) {
      let index = answer.indexOf(guess[i]);
      if (index !== -1) {
        result[i] = "almost";
      }
    }
  }
  return result;
};
