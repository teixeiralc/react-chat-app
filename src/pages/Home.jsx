import React from 'react';
import { Chat, Sidebar } from '../components';

const Home = () => {
  return (
    <div className="min-h-[100vh] grid place-items-center bg-slate-300">
      <div className="min-w-[65%] min-h-[80%] bg-white font-base rounded-xl grid grid-cols-[1fr,2fr] overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
