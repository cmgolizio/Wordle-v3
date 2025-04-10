import React from "react";

import GamePiece from "./GamePiece";

const Row = ({ children, attemptVal }) => {
  // return <div className='flex-[33%] flex flex-row m-1  '>{children}</div>;
  return (
    <div className='flex-[33%] flex flex-row m-1  '>
      {[0, 1, 2, 3, 4].map((i) => (
        <GamePiece key={i} letterPos={i} attemptVal={attemptVal} />
      ))}
    </div>
  );
};

export default Row;
