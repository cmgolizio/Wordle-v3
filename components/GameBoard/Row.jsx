import React from "react";

const Row = ({ children }) => {
  return (
    // <div className='h-full w-full min-w-full m-1 flex flex-row justify-center text-6xl text-center'>
    <div className='flex-[33%] flex flex-row m-1'>{children}</div>
  );
};

export default Row;
