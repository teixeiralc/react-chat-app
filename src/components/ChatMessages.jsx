import React from 'react';
import Message from './Message';

const ChatMessages = () => {
  return (
    <div className="bg-slate-100 h-[calc(100%-136px)]">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default ChatMessages;
