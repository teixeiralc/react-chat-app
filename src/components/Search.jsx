import React from 'react';

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
      <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-900 px-4 py-2">
        <img src="http://placekitten.com/200/300" alt="" className="avatar" />
        <div>Name</div>
      </div>
    </div>
  );
};

export default Search;
