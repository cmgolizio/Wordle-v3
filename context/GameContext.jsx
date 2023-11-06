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
  const [gameBanner, setGameBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSelectLetter = (keyVal) => {
    if (currentLine.letterPos > 4) return;
    if (gameOver.gameOver) return;

    const newBoard = [...board];
    newBoard[currentLine.attempt][currentLine.letterPos] = keyVal;
    setBoard([...newBoard]);
    return setCurrentLine((prev) => {
      return {
        ...prev,
        letterPos: currentLine.letterPos + 1,
      };
    });
  };

  const onDelete = () => {
    if (currentLine.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentLine.attempt][currentLine.letterPos - 1] = "";
    setBoard([...newBoard]);
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
    const guess = newBoard[currentLine.attempt].join("").toUpperCase();
    // const guess = newBoard[currentLine.attempt]
    //   .map((letter) => letter)
    //   .join("")
    //   .toUpperCase();
    const isValid = await validateWord(guess);
    setWordIsValid(isValid);
    console.log("WORD IS VALID: ", wordIsValid);
    // if (wordIsValid !== null) {
    if (isValid !== "Success") {
      return setGameBanner("Word not found!");
    } else {
      if (wordle.toUpperCase() === guess) {
        setCurrentLine({ attempt: currentLine.attempt + 1, letterPos: 0 });
        setGameBanner("You win!");
        return setTimeout(() => {
          setGameOver((prev) => {
            return {
              ...prev,
              gameOver: true,
              isWinner: true,
            };
          });
        }, 3000);
      } else {
        if (currentLine.attempt === 5) {
          setGameBanner("Ruh roh! Loser.");
          return setTimeout(() => {
            setGameOver((prev) => {
              return {
                ...prev,
                gameOver: true,
                isWinner: false,
              };
            });
          }, 3000);
        }
        if (currentLine.attempt < 5) {
          return setCurrentLine((prev) => {
            return {
              attempt: prev.attempt + 1,
              letterPos: 0,
            };
          });
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

  useEffect(() => {
    return () => handleNewWordle();
  }, []);

  useEffect(() => {
    if (gameBanner === "") return;

    let resetBannerTimer = setTimeout(() => setGameBanner(""), 3000);

    return () => {
      clearTimeout(resetBannerTimer);
    };
  }, [gameBanner]);

  // useEffect(() => {
  //   console.log("WORDLE IS VALID: ", wordIsValid);
  // }, [wordIsValid]);

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
        gameBanner,
        setGameBanner,
        isLoading,
        setIsLoading,
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
