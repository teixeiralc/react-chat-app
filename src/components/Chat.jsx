import React from 'react';
import { ChatContext } from '../Context/ChatContext';
import Cam from '../img/cam.png';
import Add from '../img/add.png';
import More from '../img/more.png';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const Chat = () => {
  const { data } = React.useContext(ChatContext);

  return (
    <div>
      <div className="h-20 p-4 bg-slate-700 flex justify-between items-center">
        {data.chatId !== 'null' ? (
          <>
            {' '}
            <span className="text-white">{data.user?.displayName}</span>
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
          </>
        ) : (
          ''
        )}
      </div>
      {data.chatId !== 'null' ? (
        <>
          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div className="bg-slate-200 h-[calc(80vh-80px)] p-4 grid place-items-center">
          <p className="max-w-[30ch] text-center text-lg">
            Escolha um contato para iniciar ou continuar uma conversa!
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
