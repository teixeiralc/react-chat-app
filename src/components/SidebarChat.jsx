/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const fixedChats = [
  {
    uid: 'wAI9mKuqrmXvPy9bRHYNAB1MO6V2',
    displayName: 'Lucas',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-app-7de42.appspot.com/o/Lucas?alt=media&token=fe8d6303-6df5-4478-afbe-3921d1488fa2',
  },
  {
    uid: 'AYFYB9QLQOTWHz6ekNirb8FGS9E2',
    displayName: 'Lorem',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-app-7de42.appspot.com/o/Lorem?alt=media&token=a05b83af-9972-4793-b058-bb254c540382',
  },
];

const SidebarChat = () => {
  const { curUser } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(ChatContext);

  const [chats, setChats] = React.useState([]);

  // Will add 2 users to every new user
  React.useEffect(() => {
    const unSub = () => {
      fixedChats.forEach((user) => {
        const combinedUid =
          curUser.uid > user.uid
            ? curUser.uid + user.uid
            : user.uid + curUser.uid;

        const addToUserChats = async () => {
          const res = await getDoc(doc(db, 'chats', combinedUid));
          // Create a chat collection if it doesn't exists
          if (!res.exists()) {
            await setDoc(doc(db, 'chats', combinedUid), {
              messages: [
                {
                  date: '00:00:00',
                  id: uuid(),
                  senderId: user.uid,
                  text: 'Olá, tudo bem?',
                },
              ],
            });

            // Create user chats
            await updateDoc(doc(db, 'userChats', curUser.uid), {
              [`${combinedUid}.userInfo`]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              [`${combinedUid}.date`]: serverTimestamp(),
            });

            await updateDoc(doc(db, 'userChats', user.uid), {
              [`${combinedUid}.userInfo`]: {
                uid: curUser.uid,
                displayName: curUser.displayName,
                photoURL: curUser.photoURL,
              },
              [`${combinedUid}.date`]: serverTimestamp(),
            });
          }
        };
        addToUserChats();
      });
    };
    return () => unSub();
  }, [curUser]);

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
