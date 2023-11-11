"use client";
import React, { useContext, useEffect, useRef } from "react";

import { GameContext } from "@/context/GameContext";

const GamePiece = ({ letterPos, attemptVal }) => {
  const { board, wordle, currentLine, wordIsValid, setDisabledLetters } =
    useContext(GameContext);

  const letter = board[attemptVal][letterPos];
  const correct = wordle && wordle[letterPos] === letter;
  const almost = wordle && !correct && letter !== "" && wordle.includes(letter);
  const letterState =
    currentLine.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");
  // const wordleArrRef = useRef(wordle.split(''));
  // const letterState = () => {
  //   const wordleArr = [...wordleArrRef.current];
  //   const letter = board[attemptVal][letterPos];
  //   const correct = wordle && wordle[letterPos] === letter;
  //   const almost = wordle && !correct && letter !== "" && wordleArr.includes(letter);
  //   const result = currentLine.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");
  // };

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine.attempt]);
  return (
    <div
      className={
        "flex-[33%] h-full border-2 border-slate-500 grid place-items-center text-5xl text-[#f8f8ff] font-bold rounded-md m-1"
      }
      id={`${letterState}`}
    >
      {letter}
    </div>
  );
};

export default GamePiece;
