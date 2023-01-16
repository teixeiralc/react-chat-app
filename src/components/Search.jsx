import React from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import ContactInfo from './ContactInfo';

const Search = () => {
  const { curUser } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState(null);
  const [err, setErr] = React.useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      // d === doc
      querySnapshot.forEach((d) => {
        setUser(d.data());
      });
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleKeyDown = ({ keyCode }) => keyCode === 13 && handleSearch();

  const handleSelect = async () => {
    // Checks if a chat between two users already exists
    const combinedUid =
      curUser.uid > user.uid ? curUser.uid + user.uid : user.uid + curUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedUid));

      // Create a chat collection if it doesn't exists
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedUid), { messages: [] });

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
    } catch (error) {
      setErr(error.message);
    } finally {
      setUser(null);
      setUsername('');
    }
  };

  return (
    <div>
      <div className="mb-4 px-4 py-2">
        <input
          type="text"
          className="input_search"
          placeholder="Pesquise por uma conversa"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          onKeyDown={handleKeyDown}
        />
      </div>
      {err && <span className="text-red-500">{err}</span>}
      {user && <ContactInfo data={user} onClick={handleSelect} />}
    </div>
  );
};

export default Search;
