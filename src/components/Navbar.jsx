import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-slate-900 h-20 p-4">
      <span className="font-bold">LT Chat</span>
      <div className="flex gap-2 items-center">
        <img src="http://placekitten.com/200/200" alt="" className="avatar" />
        <span>Name</span>
        <button
          type="button"
          className="bg-slate-700 p-1 rounded-md hover:bg-slate-600 text-xs"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Navbar;
