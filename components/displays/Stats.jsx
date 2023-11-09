"use client";
import React, { useContext } from "react";

import { GameContext } from "@/context/GameContext";

const Stats = () => {
  const { stats } = useContext(GameContext);
  return (
    // <div>
    <table className='text-center border-2 border-slate-400 w-full p-5 text-2xl text-[#f8f8ff]'>
      <caption>Stats</caption>
      <thead className='border-2 border-slate-400'>
        <tr>
          <th scope='col'>Played</th>
          <th scope='col'>Won</th>
          <th scope='col'>Win Streak</th>
          <th scope='col'>Win %</th>
        </tr>
      </thead>
      <tbody className='border-2 border-slate-400'>
        <tr>
          <td className='border-2 border-slate-400'>{stats.played}</td>
          <td className='border-2 border-slate-400'>{stats.wins}</td>
          <td className='border-2 border-slate-400'>{stats.streak}</td>
          <td className='border-2 border-slate-400'>{`${stats.percentage}%`}</td>
        </tr>
      </tbody>
    </table>
    // </div>
  );
};

export default Stats;
