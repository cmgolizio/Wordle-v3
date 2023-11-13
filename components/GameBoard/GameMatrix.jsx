"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";
import GamePiece from "./GamePiece";
import Row from "./Row";
import Banner from "../displays/Banner";

const GameMatrix = () => {
  const { gameBanner, gameOver, showModal, handleReset } =
    useContext(GameContext);
  return (
    // <div className='h-[450px] w-[350px] md:h-[550px] md:w-[450px] border border-[#16161D] flex flex-col justify-center mb-3 mt-5'>
    <div className='h-4/5 w-full md:h-[550px] md:w-[450px] border border-[#16161D] flex flex-col justify-center mb-3 mt-5'>
      {" "}
      {gameBanner ? <Banner gameBanner={gameBanner} /> : null}
      {gameOver.gameOver && !showModal ? (
        <button
          className='px-6 py-4 rounded-full bg-slate-400 color-[#16161D] hover:scale-105 hover:bg-slate-500 active:scale-100 active:bg-slate-700 w-40 h-auto text-xl self-center'
          onClick={handleReset}
        >
          Play Again
        </button>
      ) : null}
      <Row>
        <GamePiece letterPos={0} attemptVal={0} />
        <GamePiece letterPos={1} attemptVal={0} />
        <GamePiece letterPos={2} attemptVal={0} />
        <GamePiece letterPos={3} attemptVal={0} />
        <GamePiece letterPos={4} attemptVal={0} />
      </Row>
      <Row>
        <GamePiece letterPos={0} attemptVal={1} />
        <GamePiece letterPos={1} attemptVal={1} />
        <GamePiece letterPos={2} attemptVal={1} />
        <GamePiece letterPos={3} attemptVal={1} />
        <GamePiece letterPos={4} attemptVal={1} />
      </Row>
      <Row>
        <GamePiece letterPos={0} attemptVal={2} />
        <GamePiece letterPos={1} attemptVal={2} />
        <GamePiece letterPos={2} attemptVal={2} />
        <GamePiece letterPos={3} attemptVal={2} />
        <GamePiece letterPos={4} attemptVal={2} />
      </Row>
      <Row>
        <GamePiece letterPos={0} attemptVal={3} />
        <GamePiece letterPos={1} attemptVal={3} />
        <GamePiece letterPos={2} attemptVal={3} />
        <GamePiece letterPos={3} attemptVal={3} />
        <GamePiece letterPos={4} attemptVal={3} />
      </Row>
      <Row>
        <GamePiece letterPos={0} attemptVal={4} />
        <GamePiece letterPos={1} attemptVal={4} />
        <GamePiece letterPos={2} attemptVal={4} />
        <GamePiece letterPos={3} attemptVal={4} />
        <GamePiece letterPos={4} attemptVal={4} />
      </Row>
      <Row>
        <GamePiece letterPos={0} attemptVal={5} />
        <GamePiece letterPos={1} attemptVal={5} />
        <GamePiece letterPos={2} attemptVal={5} />
        <GamePiece letterPos={3} attemptVal={5} />
        <GamePiece letterPos={4} attemptVal={5} />
      </Row>
    </div>
  );
};

export default GameMatrix;
