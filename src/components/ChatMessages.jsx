import React from 'react';
import Message from './Message';

const ChatMessages = () => {
  return (
    <div className="bg-slate-200 h-[calc(80vh-136px)] p-4 overflow-y-scroll">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default ChatMessages;
