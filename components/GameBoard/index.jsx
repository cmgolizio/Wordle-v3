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
  ) : isLoading ? (
    <Loading />
  ) : (
    <>
      <Modal />
      <GameMatrix />
      <Keyboard />
    </>
  );
};

export default GameBoard;
