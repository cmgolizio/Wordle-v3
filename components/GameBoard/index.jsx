"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";
import Modal from "../displays/Modal";
import GameMatrix from "./GameMatrix";
import Keyboard from "../Keyboard";
import Loading from "../displays/Loading";

const GameBoard = () => {
  const { isLoading } = useContext(GameContext);
  return isLoading ? (
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
