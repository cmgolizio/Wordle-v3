import React from "react";

const Loading = () => {
  return (
    <div className='w-screen h-screen bg-[linear-gradient(180deg, hsla(240, 14%, 10%, 1) 0%, rgb(37, 37, 37) 100%)] text-5xl flex justify-center z-50 opacity-[98%] items-center absolute'>
      <h1>Getting word...</h1>
    </div>
  );
};

export default Loading;
