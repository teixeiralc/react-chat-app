import React from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';

const ChatInput = () => {
  return (
    <div className="flex items-center justify-between gap-4 border-t-2 border-slate-400">
      <input type="text" className="input_chat" placeholder="Mensagem" />
      <div className="flex items-center gap-4 cursor-pointer">
        <img src={Attach} alt="Enviar um arquivo" className="h-8 w-8" />
        <label htmlFor="file">
          <input type="file" style={{ display: 'none' }} id="file" />
          <img
            src={Img}
            alt="Enviar uma imagem"
            className="h-8 w-8 cursor-pointer"
          />
        </label>
        <button
          className="p-2 bg-slate-900 text-white rounded-lg mr-4 hover:bg-slate-700"
          type="button"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
