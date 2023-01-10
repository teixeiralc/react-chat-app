import React from 'react';
import ContactInfo from './ContactInfo';

const Search = () => {
  return (
    <div>
      <div className="mb-4 px-4 py-2">
        <input
          type="text"
          className="input_search"
          placeholder="Pesquise por uma conversa"
        />
      </div>
      <ContactInfo />
    </div>
  );
};

export default Search;
