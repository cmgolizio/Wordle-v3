"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";
import Modal from "../displays/Modal";
import GameMatrix from "./GameMatrix";
import Keyboard from "../Keyboard";
import Loading from "../displays/Loading";
import Intro from "../displays/Intro";

const GameBoard = () => {
  const { isLoading, showIntro } = useContext(GameContext);
  return showIntro ? (
    <Intro />
  ) : (
    <div className='flex flex-col justify-center items-center h-full'>
      {isLoading && <Loading />}
      <Modal />
      <GameMatrix />
      <Keyboard />
    </div>
  );
  // return showIntro ? (
  //   <Intro />
  // ) : isLoading ? (
  //   <Loading />
  // ) : (
  //   <div className='flex flex-col justify-center items-center h-full'>
  //     <Modal />
  //     <GameMatrix />
  //     <Keyboard />
  //   </div>
  // );
};

export default GameBoard;
