"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";

const Key = ({ keyVal, bigKey, disabled }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(GameContext);

  const selectLetter = (e) => {
    e.preventDefault();
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div
      onClick={(e) => selectLetter(e)}
      className='cursor-pointer active:bg-[#72808A] p-2 rounded-md mx-1 w-14 h-16 text-center text-[#f8f8ff] bg-initial text-3xl'
      id={bigKey ? "big-key" : disabled ? "disabled-key" : null}
    >
      {keyVal}
    </div>
  );
};

export default Key;
