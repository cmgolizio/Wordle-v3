"use client";
import React, { useState, createContext, useEffect } from "react";

import { validateWord } from "@/axios/validateWord";
import { getNewWordle } from "@/axios/getNewWordle";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  initialBoard,
  initialLine,
  initialGameOver,
  initialStats,
} from "@/constants/initialStates";

export const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(initialBoard);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [wordIsValid, setWordIsValid] = useState(null);
  const [wordle, setWordle] = useState("");
  const [currentLine, setCurrentLine] = useState(initialLine);
  const [gameBanner, setGameBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(initialGameOver);
  const [stats, setStats] = useLocalStorage("wordle-stats", initialStats);

  const getWinPercentage = (totalPlayed, wins) => {
    const winPercentage = (wins / totalPlayed) * 100;
    return parseFloat(winPercentage.toFixed(1));
  };

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
    const isValid = await validateWord(guess);
    setWordIsValid(isValid);
    if (isValid !== "Success") {
      setGameBanner("Word not found!");
    } else {
      if (wordle.toUpperCase() === guess) {
        setCurrentLine({ attempt: currentLine.attempt + 1, letterPos: 0 });
        setGameBanner("You win!");
        setStats((prev) => {
          const winPercentage = getWinPercentage(
            prev.played + 1,
            prev.wins + 1
          );
          return {
            played: prev.played + 1,
            wins: prev.wins + 1,
            streak: prev.streak + 1,
            percentage: winPercentage,
          };
        });
        return setTimeout(() => {
          setGameOver((prev) => {
            return {
              ...prev,
              gameOver: true,
              isWinner: true,
            };
          });
        }, 2500);
      } else {
        if (currentLine.attempt === 5) {
          setGameBanner("Ruh roh! Loser.");
          setStats((prev) => {
            const winPercentage = getWinPercentage(prev.played + 1, prev.wins);
            return {
              ...prev,
              played: prev.played + 1,
              streak: 0,
              percentage: winPercentage,
            };
          });
          return setTimeout(() => {
            setGameOver((prev) => {
              return {
                ...prev,
                gameOver: true,
                isWinner: false,
              };
            });
          }, 2500);
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
    setIsLoading(true);
    const newWordle = await getNewWordle();
    const checkWordle = await validateWord(newWordle);
    if (checkWordle === "Success") {
      setWordle(newWordle);
      return setIsLoading(false);
    } else {
      return handleNewWordle();
    }
  };

  useEffect(() => {
    handleNewWordle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameBanner === "") return;

    let resetBannerTimer = setTimeout(() => setGameBanner(""), 2500);

    return () => {
      clearTimeout(resetBannerTimer);
    };
  }, [gameBanner]);

  const handleReset = () => {
    const oldBoard = [...board];
    oldBoard.map((row) => {
      for (let i = 0; i < row.length; i++) {
        row[i] = "";
      }
      return row;
    });
    setCurrentLine(initialLine);
    setDisabledLetters([]);
    setGameOver(initialGameOver);
    setWordIsValid(null);
    setGameBanner("");
    setShowModal(false);
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
        showModal,
        setShowModal,
        stats,
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
