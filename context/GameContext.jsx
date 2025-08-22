"use client";
import React, {
  useState,
  createContext,
  useEffect,
  useLayoutEffect,
} from "react";

// import { validateWord } from "@/axios/validateWord";
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
  const [wordleDefinition, setWordleDefinition] = useState("");
  const [showDefinition, setShowDefinition] = useState(false);
  const [showDefinitionModal, setShowDefinitionModal] = useState(false);
  const [wordleChars, setWordleChars] = useState([]);
  const [currentLine, setCurrentLine] = useState(initialLine);
  const [gameBanner, setGameBanner] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(initialGameOver);
  const [showIntro, setShowIntro] = useState(true);
  const [stats, setStats] = useLocalStorage("wordle-stats", initialStats);

  const validateWord = (word) => {
    const validationResults = word
      ?.split("")
      .filter((ch) => ch.match(/[a-zA-Z]/))
      .join("");
    const res = validationResults === word ? "Success." : "Word not found";
    return res;
  };

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
    const isValid = validateWord(guess);
    setWordIsValid(isValid);
    if (isValid !== "Success.") {
      setGameBanner("Word not found!");
    } else {
      if (wordle.toUpperCase() === guess) {
        setCurrentLine({ attempt: currentLine.attempt + 1, letterPos: 0 });
        setGameBanner("Noice! YOU WON!");
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
          setGameBanner("Welp... You're out of guesses so.. you lose!");
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
              attempt: prev.attempt++,
              letterPos: 0,
            };
          });
        }
      }
    }
  };

  const handleNewWordle = async () => {
    setIsLoading(true);
    const wordleObj = await getNewWordle();
    const newWordle = wordleObj?.word;
    const newDefinition = wordleObj?.definition;
    if (newDefinition === undefined) return handleNewWordle();

    const checkWordle = validateWord(newWordle);
    if (checkWordle === "Success.") {
      setWordle(newWordle);
      setWordleDefinition(newDefinition);
      return setIsLoading(false);
    } else {
      return handleNewWordle();
    }
  };

  // useEffect(() => {
  //   console.log("SHOW DEFINITION MODAL: ", showDefinitionModal);
  // }, [showDefinitionModal]);

  // useEffect(() => {
  //   handleNewWordle();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useLayoutEffect(() => {
  //   console.log(wordleChars);
  // }, [wordleChars]);

  useLayoutEffect(() => {
    if (!wordle) {
      return;
    }
    const word = wordle;
    const chars = word.split("");
    setWordleChars(chars);
  }, [wordle]);

  useEffect(() => {
    if (gameBanner === "") return;

    let resetBannerTimer = setTimeout(() => setGameBanner(""), 2000);

    return () => {
      clearTimeout(resetBannerTimer);
    };
  }, [gameBanner]);

  const toggleModal = () => setShowModal((prev) => !prev);

  const toggleShowDefinition = () => setShowDefinition((prev) => !prev);

  const toggleShowDefinitionModal = () =>
    setShowDefinitionModal((prev) => !prev);

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
    setShowDefinition(false);
    setShowDefinitionModal(false);
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
        handleNewWordle,
        wordle,
        setWordle,
        wordleDefinition,
        setWordleDefinition,
        showDefinition,
        toggleShowDefinition,
        showDefinitionModal,
        toggleShowDefinitionModal,
        wordleChars,
        setWordleChars,
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
        toggleModal,
        handleReset,
        showIntro,
        setShowIntro,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
