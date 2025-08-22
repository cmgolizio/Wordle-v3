"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";
import Row from "./Row";
import Banner from "../displays/Banner";

const GameMatrix = () => {
  const {
    gameBanner,
    gameOver,
    showModal,
    toggleModal,
    toggleShowDefinitionModal,
    handleReset,
    isLoading,
  } = useContext(GameContext);
  return isLoading ? (
    <div className='h-4/5 w-full md:h-[550px] md:w-[450px] border border-[#16161D] flex flex-col justify-centers opacity-20'>
      <Row attemptVal={0} />
      <Row attemptVal={1} />
      <Row attemptVal={2} />
      <Row attemptVal={3} />
      <Row attemptVal={4} />
      <Row attemptVal={5} />
    </div>
  ) : (
    <div className='h-4/5 w-full md:h-[550px] md:w-[450px] border border-[#16161D] flex flex-col justify-centers'>
      {" "}
      {gameBanner ? <Banner gameBanner={gameBanner} /> : null}
      {gameOver.gameOver && !showModal ? (
        <div className='w-full min-w-full flex flex-row content-center justify-evenly'>
          <button
            className='p-3 mb-4 rounded-xl bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 h-auto text-lg self-center'
            onClick={toggleModal}
          >
            Show Stats
          </button>
          <button
            className='p-3 mb-4 rounded-xl bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 h-auto text-lg self-center'
            onClick={handleReset}
          >
            Play Again
          </button>
          <button
            className='p-3 mb-4 rounded-xl bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 h-auto text-lg self-center'
            onClick={toggleShowDefinitionModal}
          >
            Definition
          </button>
        </div>
      ) : null}
      <Row attemptVal={0} />
      <Row attemptVal={1} />
      <Row attemptVal={2} />
      <Row attemptVal={3} />
      <Row attemptVal={4} />
      <Row attemptVal={5} />
    </div>
  );
};

export default GameMatrix;
