import React from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ContactInfo from './ContactInfo';

const Search = () => {
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
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleKeyDown = ({ keyCode }) => keyCode === 13 && handleSearch();
  return (
    <div>
      <div className="mb-4 px-4 py-2">
        <input
          type="text"
          className="input_search"
          placeholder="Pesquise por uma conversa"
          onChange={({ target }) => setUsername(target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {err && <span className="text-red-500">{err}</span>}
      {user && <ContactInfo data={user} />}
    </div>
  );
};

export default Search;
