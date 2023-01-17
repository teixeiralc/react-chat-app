/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import CreateFixedChats from '../Helper/CreateFixedChats';

const SidebarChat = () => {
  const { curUser } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(ChatContext);
  const [chats, setChats] = React.useState([]);
  const { createChats } = CreateFixedChats();

  React.useEffect(() => {
    let ignore = false;
    if (!ignore) createChats();
    return () => {
      ignore = true;
    };
  }, [createChats]);

  React.useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, 'userChats', curUser.uid), (d) => {
        setChats(d.data());
      });
      return () => unSub();
    };
    if (curUser.uid) getChats();
  }, [curUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            onClick={() => handleSelect(chat[1].userInfo)}
            key={chat[0]}
            className="flex items-center gap-2 cursor-pointer hover:bg-slate-900 px-4 py-2"
          >
            <img src={chat[1].userInfo.photoURL} alt="" className="avatar" />
            <div>
              <span className="font-bold text-lg">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-sm text-slate-300">
                {chat[1].latestMsg?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SidebarChat;
