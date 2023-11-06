"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";
import GamePiece from "./GamePiece";
import Row from "./Row";
import Banner from "../displays/Banner";

const GameBoard = () => {
  const { gameBanner } = useContext(GameContext);
  return (
    // <div className='h-2/3 min-w-full w-full px-10 pb-6 mt-6 flex flex-col'>
    <div className='h-[550px] w-[450px] border border-[#16161D] flex flex-col justify-center mb-6'>
      {" "}
      {!gameBanner ? null : <Banner gameBanner={gameBanner} />}
      {/* <Banner gameBanner='testing testing testing' /> */}
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

export default GameBoard;
