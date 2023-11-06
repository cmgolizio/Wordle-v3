"use client";
import React, { useMemo, useContext, useCallback, useEffect } from "react";

import { GameContext } from "@/context/GameContext";
import Key from "./Key";

const Keyboard = () => {
  const {
    onSelectLetter,
    onEnter,
    onDelete,
    disabledLetters,
    gameOver,
    currentLine,
  } = useContext(GameContext);
  const keysRow1 = useMemo(() => {
    return ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  }, []);
  const keysRow2 = useMemo(() => {
    return ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  }, []);
  const keysRow3 = useMemo(() => {
    return ["Z", "X", "C", "V", "B", "N", "M"];
  }, []);

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        return onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keysRow1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });

        keysRow2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });

        keysRow3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [
      gameOver.gameOver,
      onEnter,
      onDelete,
      keysRow1,
      keysRow2,
      keysRow3,
      onSelectLetter,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // [currentLine]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);
  return (
    <div
      className='h-1/3 min-w-full w-full px-24 pb-20'
      onKeyDown={handleKeyboard}
    >
      <div className='keyboard-row'>
        {keysRow1.map((key, i) => (
          <Key key={i} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className='keyboard-row'>
        {keysRow2.map((key, i) => (
          <Key key={i} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className='keyboard-row'>
        <Key keyVal='ENTER' bigKey />
        {keysRow3.map((key, i) => (
          <Key key={i} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
        <Key keyVal='DELETE' bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
