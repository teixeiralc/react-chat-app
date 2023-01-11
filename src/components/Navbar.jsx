import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const { curUser } = React.useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-slate-900 h-20 p-4">
      <span className="font-bold hidden lg:block">LT Chat</span>
      <div className="flex gap-2 items-center justify-between flex-1 lg:flex-initial">
        <img src={curUser.photoURL} alt="" className="avatar" />
        <span>{curUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
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
