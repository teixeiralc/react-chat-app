import React from 'react';
import { Chat, Sidebar } from '../components';

const Home = () => {
  return (
    <div className="min-h-[100vh] grid place-items-center bg-slate-300">
      <div className="w-[90vw] md:w-[65vw] h-[80vh] bg-white font-base rounded-xl grid grid-cols-[1fr,2fr] overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
