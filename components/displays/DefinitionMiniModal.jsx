import React, { useContext } from "react";
import Image from "next/image";

import { GameContext } from "@/context/GameContext";

const DefinitionMiniModal = () => {
  const {
    wordle,
    wordleDefinition,
    showDefinitionModal,
    toggleShowDefinitionModal,
  } = useContext(GameContext);

  const showMiniModal = (e) => {
    e.preventDefault();
    toggleShowDefinitionModal();
  };
  return !showDefinitionModal ? null : (
    <div className='w-1/3 h-1/3 flex flex-col items-center justify-between bg-slate-900 color-[#f8f8ff] z-20 absolute top-3/5 left-2/5 p-10 mb-16 opacity-[75%] rounded-xl px-3'>
      <h1 className='text-center text-xl text-bold'>{wordle}</h1>
      <h2 className='text-center mt-4'>{wordleDefinition}</h2>
      {/* <button onClick={toggleShowDefinitionModal}>Close</button> */}
      <button className='mt-10' onClick={(e) => showMiniModal(e)}>
        <Image src='/x-icon.svg' alt='close button' height={26} width={26} />
      </button>
    </div>
  );
};

export default DefinitionMiniModal;
