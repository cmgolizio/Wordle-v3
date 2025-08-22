"use client";
import React, { useContext } from "react";
import Image from "next/image";

import { GameContext } from "@/context/GameContext";

const Key = ({ keyVal, bigKey, disabled }) => {
  const { onSelectLetter, onEnter, onDelete } = useContext(GameContext);

  const selectLetter = (e) => {
    e.preventDefault();
    if (keyVal === "ENTER") {
      // console.log("ENTER: ", keyVal);
      onEnter();
    } else if (keyVal === "DELETE") {
      // console.log("DELETE: ", keyVal);
      onDelete();
    } else {
      // console.log("KEY VAL: ", keyVal);
      onSelectLetter(keyVal);
    }
  };

  return (
    <button
      onClick={(e) => selectLetter(e)}
      className='active:bg-[#5b656d] active:scale-105 p-1 rounded-md mx-0.5 w-8 h-14 text-center text-[#f8f8ff] bg-initial text-2xl flex content-center justify-center md:w-14 md:h-16 md:text-3xl md:mx-1'
      id={bigKey ? "big-key" : disabled ? "disabled-key" : "normal-key"}
    >
      {keyVal === "DELETE" ? (
        <Image
          src='/backspace-icon.svg'
          alt='icon for backspace key'
          className='h-full w-full'
          height={28}
          width={28}
        />
      ) : keyVal === "ENTER" ? (
        <Image
          src='/check-icon.svg'
          alt='icon for enter key'
          className='h-full w-full'
          height={28}
          width={28}
        />
      ) : (
        keyVal
      )}
    </button>
  );
};

export default Key;
