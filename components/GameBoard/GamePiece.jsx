"use client";
import React, { useContext, useEffect } from "react";
import clsx from "clsx";

import { GameContext } from "@/context/GameContext";

const GamePiece = ({ letterPos, attemptVal }) => {
  const { board, wordle, currentLine, setDisabledLetters } =
    useContext(GameContext);

  const letter = board[attemptVal][letterPos];
  const correct = wordle && wordle[letterPos] === letter;
  const almost = wordle && !correct && letter !== "" && wordle.includes(letter);
  const letterState =
    currentLine.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine.attempt]);

  const delayColorChange = (letterPos, letterState) => {
    return setTimeout(() => letterState, letterPos * 300);
  };

  return (
    <div
      className={clsx(
        `flex-[33%] h-full border-2 border-slate-500 grid place-items-center text-5xl text-[#f8f8ff] font-bold rounded-sm m-1 animated transition-colors duration-${
          letterPos * 300
        }`,
        {
          "animate-flip-up": letterState,
        }
      )}
      style={{
        animationDelay: `${letterPos * 300}ms`,
        animationFillMode: "forwards",
      }}
      id={`${letterState}`}
    >
      {letter}
    </div>
  );
};

export default GamePiece;
