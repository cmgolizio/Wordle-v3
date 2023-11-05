import React from "react";

import GamePiece from "./GamePiece";
import Row from "./Row";

const GameBoard = () => {
  return (
    // <div className='h-2/3 min-w-full w-full px-10 pb-6 mt-6 flex flex-col'>
    <div className='h-[550px] w-[450px] border border-black flex flex-col mb-6'>
      {" "}
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
