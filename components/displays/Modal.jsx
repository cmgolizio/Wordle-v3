"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";

const Modal = () => {
  const { gameOver, handleReset, wordle } = useContext(GameContext);
  const showWordle = () => {
    if (gameOver.gameOver && !gameOver.isWinner) {
      return true;
    }
    return false;
  };
  if (!gameOver.gameOver) {
    return null;
  }
  return (
    <div className='w-2/5 h-3/5 flex flex-col items-center justify-center bg-slate-900 color-[#f8f8ff] z-20 absolute top-3/5 left-2/5 p-20 mb-16 opacity-[98%] rounded-xl'>
      {showWordle() && <h1>{`The word was: ${wordle}`}</h1>}
      <h1>STATS</h1>
      <button
        className='px-6 py-4 rounded-full bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 w-32 h-auto'
        onClick={handleReset}
      >
        Play Again
      </button>
    </div>
  );
};

export default Modal;
