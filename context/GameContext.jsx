"use client";
import React, { useState, createContext, useEffect } from "react";

import { validateWord } from "@/axios/validateWord";
import { getNewWordle } from "@/axios/getNewWordle";

export const GameContext = createContext();

const initialBoard = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(initialBoard);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [wordIsValid, setWordIsValid] = useState(null);
  const [currentLine, setCurrentLine] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    isWinner: false,
  });
  const [wordle, setWordle] = useState("");
  // const [wordle, setWordle] = useState(async () => {
  //   const firstWordle = await getNewWordle();
  //   return firstWordle;
  // });
  // const [letterStates, setLetterStates] = useState(initialBoard);
  const [gameBanner, setGameBanner] = useState("");

  const onSelectLetter = (keyVal) => {
    if (currentLine.letterPos > 4) return;
    if (gameOver.gameOver) return;

    const newBoard = [...board];
    newBoard[currentLine.attempt][currentLine.letterPos] = keyVal;
    setBoard(newBoard);
    return setCurrentLine({
      ...currentLine,
      letterPos: currentLine.letterPos + 1,
    });
  };

  const onDelete = () => {
    if (currentLine.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentLine.attempt][currentLine.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentLine({
      ...currentLine,
      letterPos: currentLine.letterPos - 1,
    });
  };

  const onEnter = async () => {
    if (currentLine.letterPos !== 5) {
      return setGameBanner("Enter a five letter word.");
    }
    const newBoard = [...board];
    // const guess = newBoard[currentLine.attempt].join("").toUpperCase();
    const guess = newBoard[currentLine.attempt]
      .map((letter) => letter)
      .join("")
      .toUpperCase();
    const isValid = await validateWord(guess);
    setWordIsValid(isValid);
    if (wordIsValid !== null) {
      console.log("IS VALID: ", isValid);
      if (isValid !== "Success") {
        return setGameBanner("Word not found!");
      } else {
        if (wordle.toUpperCase() === guess) {
          setCurrentLine({ attempt: currentLine.attempt + 1, letterPos: 0 });
          setGameBanner("You win!");
          return setTimeout(() => {
            setGameOver({ gameOver: true, isWinner: true });
          }, 2000);
        } else {
          if (currentLine.attempt === 5) {
            setGameOver({ gameOver: true, isWinner: false });
            return setGameBanner("Ruh roh! Loser.");
          }
          if (currentLine.attempt < 5) {
            return setCurrentLine({
              attempt: currentLine.attempt + 1,
              letterPos: 0,
            });
          }
        }
      }
    }
  };

  const handleNewWordle = async () => {
    const newWordle = await getNewWordle();
    const checkWordle = await validateWord(newWordle);
    if (checkWordle === "Success") {
      return setWordle(newWordle);
    } else {
      return handleNewWordle();
    }
  };

  // useEffect(() => {
  //   return () => {
  //     let newHeaders = new Headers();
  //     newHeaders.append(
  //       "X-RapidAPI-Key",
  //       process.env.NEXT_PUBLIC_X_RAPID_API_KEY
  //     );
  //     newHeaders.append("X-RapidAPI-Host", "random-word-api.p.rapidapi.com");
  //     const requestOptions = {
  //       method: "GET",
  //       headers: newHeaders,
  //       redirect: "follow",
  //     };
  //     fetch("https://random-word-api.p.rapidapi.com/L/5", requestOptions)
  //       .then((response) => response.json())
  //       .then(
  //         (result) => {
  //           console.log("FROM getNewWordle.js: ", result.word);
  //           return setWordle(result.word);
  //         },
  //         (error) => console.log("error", error)
  //       );
  //   };
  // }, []);

  useEffect(() => {
    handleNewWordle();
  }, []);

  useEffect(() => {
    console.log("WORDLE STATE: ", wordle);
  }, [wordle]);

  const handleReset = () => {
    const oldBoard = [...board];
    oldBoard.map((row) => {
      for (let i = 0; i < row.length; i++) {
        row[i] = "";
      }
      return row;
    });
    setCurrentLine({ attempt: 0, letterPos: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, isWinner: false });
    setWordIsValid(null);
    // setLetterStates(initialBoard);
    setGameBanner("");
    handleNewWordle();
  };
  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        disabledLetters,
        setDisabledLetters,
        wordIsValid,
        setWordIsValid,
        currentLine,
        setCurrentLine,
        gameOver,
        setGameOver,
        wordle,
        setWordle,
        // letterStates,
        // setLetterStates,
        gameBanner,
        setGameBanner,
        onSelectLetter,
        onDelete,
        onEnter,
        handleReset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

// const initialBoard = [
//   [
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//   ],
//   [
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//   ],
//   [
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//   ],
//   [
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//   ],
//   [
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//   ],
//   [
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//     { letter: "", state: "initial" },
//   ],
// ];
