import React from 'react';
import Cam from '../img/cam.png';
import Add from '../img/add.png';
import More from '../img/more.png';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  return (
    <div>
      <div className="h-20 p-4 bg-slate-700 flex justify-between items-center">
        <span className="text-white">Username</span>
        <div className="cursor-pointer flex items-center gap-2">
          <img
            src={Cam}
            alt=""
            className="w-8 h-8 hover:scale-110 transition-all"
          />
          <img
            src={Add}
            alt=""
            className="w-8 h-8 hover:scale-110 transition-all"
          />
          <img
            src={More}
            alt=""
            className="w-8 h-8 hover:scale-110 transition-all"
          />
        </div>
      </div>
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Chat;
