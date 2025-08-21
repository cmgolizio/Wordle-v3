"use client";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import Image from "next/image";

import { GameContext } from "@/context/GameContext";
import Stats from "./Stats";

const Modal = () => {
  const {
    gameOver,
    handleReset,
    wordle,
    showModal,
    setShowModal,
    wordleDefinition,
    showDefinition,
    setShowDefinition,
  } = useContext(GameContext);

  const showWordle = () => {
    if (gameOver.gameOver && !gameOver.isWinner) {
      return true;
    }
    return false;
  };

  const handleCloseModal = (e) => {
    e.preventDefault();

    setShowModal(false);
  };

  useLayoutEffect(() => {
    if (gameOver.gameOver) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver.gameOver]);

  const handleShowDefinition = (e) => {
    e.preventDefault();

    setShowDefinition((prev) => {
      return !prev;
    });
  };

  // if (!gameOver.gameOver) return null;
  if (!showModal) return null;
  return (
    <div className='w-full h-full flex flex-col items-center justify-between bg-slate-900 color-[#f8f8ff] z-20 absolute top-3/5 left-2/5 p-20 mb-16 opacity-[75%] rounded-xl px-3'>
      <button onClick={(e) => handleCloseModal(e)}>
        <Image src='/x-icon.svg' alt='close button' height={32} width={32} />
      </button>
      {showWordle() && (
        <div className='w-full h-fit flex flex-col content-center justify-center items-center justify-items-center'>
          <h1 className='text-2xl'>{"The word was: "}</h1>
          <h1 className='text-3xl text-correct'>{wordle}</h1>
        </div>
      )}
      <Stats />
      <div className='w-full h-fit flex flex-col content-center justify-center items-center justify-items-center'>
        <button
          className='p-3 rounded-xl bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 h-auto text-lg opacity-100'
          onClick={handleShowDefinition}
        >
          What does this word mean?
        </button>
        {showDefinition && (
          <h1 className='text-2xl'>{`${wordle}: ${wordleDefinition}`}</h1>
        )}
      </div>
      <button
        className='p-3 rounded-xl bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 h-auto text-lg opacity-100'
        onClick={handleReset}
      >
        Play Again
      </button>
    </div>
  );
};

export default Modal;
