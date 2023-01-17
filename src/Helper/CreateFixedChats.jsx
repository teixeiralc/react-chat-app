import React from 'react';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../firebase';

const fixedChats = [
  {
    uid: 'q6BZdBgKYDgGtToSVaAzfsmlPpd2',
    displayName: 'Lucas',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-app-7de42.appspot.com/o/Lucas?alt=media&token=9546c7bd-ba8d-4783-b0e8-ad4e0b802a58',
  },
  {
    uid: 'wqUWHY1WgSc0qAeAAFhwwWtHAFW2',
    displayName: 'Lorem',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/react-chat-app-7de42.appspot.com/o/Lorem?alt=media&token=a7efc129-a9c4-4fdc-b4bf-ea8fb88a832d',
  },
];

const CreateFixedChats = () => {
  const { curUser } = React.useContext(AuthContext);

  const createChats = React.useCallback(() => {
    fixedChats.forEach((fixedUser) => {
      const asyncFunc = async () => {
        const combinedUid =
          curUser.uid > fixedUser.uid
            ? curUser.uid + fixedUser.uid
            : fixedUser.uid + curUser.uid;
        const res = await getDoc(doc(db, 'chats', combinedUid));
        if (!res.exists()) {
          await setDoc(doc(db, 'chats', combinedUid), {
            messages: [
              {
                date: '00:00:00',
                id: uuid(),
                senderId: fixedUser.uid,
                text: 'Olá',
              },
              {
                date: '00:00:00',
                id: uuid(),
                senderId: fixedUser.uid,
                text: 'Tudo bem?',
              },
            ],
          });
          // Create user chats
          await updateDoc(doc(db, 'userChats', curUser.uid), {
            [`${combinedUid}.userInfo`]: {
              uid: fixedUser.uid,
              displayName: fixedUser.displayName,
              photoURL: fixedUser.photoURL,
            },
            [`${combinedUid}.date`]: serverTimestamp(),
          });
          await updateDoc(doc(db, 'userChats', fixedUser.uid), {
            [`${combinedUid}.userInfo`]: {
              uid: curUser.uid,
              displayName: curUser.displayName,
              photoURL: curUser.photoURL,
            },
            [`${combinedUid}.date`]: serverTimestamp(),
          });
        }
      };
      asyncFunc();
    });
  }, [curUser]);

  return { createChats };
};

export default CreateFixedChats;
