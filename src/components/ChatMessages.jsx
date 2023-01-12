import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { ChatContext } from '../Context/ChatContext';
import { db } from '../firebase';
import Message from './Message';

const ChatMessages = () => {
  const { data } = React.useContext(ChatContext);

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (d) => {
      if (d.exists()) setMessages(d.data().messages);
    });

    return () => unSub();
  }, [data.chatId]);

  return (
    <div className="bg-slate-200 h-[calc(80vh-136px)] p-4 overflow-y-scroll">
      {messages.map((msg) => (
        <Message msg={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default ChatMessages;
