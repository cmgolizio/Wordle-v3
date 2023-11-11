"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";

const Key = ({ keyVal, bigKey, disabled }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(GameContext);

  const selectLetter = (e) => {
    e.preventDefault();
    if (keyVal === "ENTER") {
      console.log("ENTER: ", keyVal);
      onEnter();
    } else if (keyVal === "DELETE") {
      console.log("DELETE: ", keyVal);
      onDelete();
    } else {
      console.log("KEY VAL: ", keyVal);
      onSelectLetter(keyVal);
    }
  };

  return (
    <div
      onClick={(e) => selectLetter(e)}
      className='cursor-pointer active:bg-[#72808A] p-2 rounded-md mx-0.5 w-7 h-14 text-center text-[#f8f8ff] bg-initial text-2xl flex content-center justify-center md:w-14 md:h-16 md:text-3xl md:mx-1'
      id={bigKey ? "big-key" : disabled ? "disabled-key" : null}
    >
      {keyVal}
    </div>
  );
};

export default Key;
