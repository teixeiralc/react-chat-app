import React from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
import { db, storage } from '../firebase';
import Img from '../img/img.png';
import Attach from '../img/attach.png';

const ChatInput = () => {
  const { curUser } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);

  const [text, setText] = React.useState('');
  const [img, setImg] = React.useState(null);

  const handleSearch = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: curUser.uid,
              date: Timestamp.now().toDate().toLocaleTimeString(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: curUser.uid,
          date: Timestamp.now().toDate().toLocaleTimeString(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', curUser.uid), {
      [`${data.chatId}.latestMsg`]: {
        text,
      },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [`${data.chatId}.latestMsg`]: {
        text,
      },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    setText('');
    setImg(null);
  };

  const handleKeyDown = ({ keyCode }) => keyCode === 13 && handleSearch();

  return (
    <div className="flex items-center justify-between gap-4 border-t-2 border-slate-400">
      <input
        type="text"
        className="input_chat flex-1 text-lg"
        placeholder="Mensagem"
        onKeyDown={handleKeyDown}
        onChange={({ target }) => setText(target.value)}
        value={text}
      />
      <div className="flex flex-2 items-center gap-4 cursor-pointer">
        <img src={Attach} alt="Enviar um arquivo" className="h-8 w-8" />
        <label htmlFor="file">
          <input
            type="file"
            style={{ display: 'none' }}
            id="file"
            onChange={({ target }) => setImg(target.files[0])}
          />
          <img
            src={Img}
            alt="Enviar uma imagem"
            className="h-8 w-8 cursor-pointer mr-4"
          />
        </label>
      </div>
    </div>
  );
};

export default ChatInput;
