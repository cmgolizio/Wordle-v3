import React from "react";

const Banner = ({ gameBanner }) => {
  return (
    <div className='w-auto h-auto px-6 py-4 bg-slate-500 color-[#f8f8ff] text-center text-xl absolute rounded-md z-30 self-center'>
      <h1>{gameBanner}</h1>
    </div>
  );
};

export default Banner;
