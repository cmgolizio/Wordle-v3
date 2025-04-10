"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";

const Intro = () => {
  const { showIntro, setShowIntro, handleReset } = useContext(GameContext);
  const handlePlay = () => {
    setShowIntro(false);
    handleReset();
  };
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-linear-gradient(180deg, hsla(240, 14%, 10%, 1) 0%, rgb(37, 37, 37) 100%) color-[#f8f8ff] z-20 absolute top-3/5 left-2/5 p-20 mb-16 rounded-xl px-3'>
      <h1 className='text-5xl mb-5'>Wordle(too)</h1>
      <h2 className='text-2xl mb-5'>
        You have 6 chances to guess the five letter word.
      </h2>
      <h2 className='text-3xl'>
        Ready... set.....{" "}
        <span>
          <button
            className='mb-3 px-6 py-2 rounded-xl bg-slate-600 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 h-auto text-3xl'
            onClick={handlePlay}
          >
            GO!
          </button>
        </span>
      </h2>
    </div>
  );
};

export default Intro;
