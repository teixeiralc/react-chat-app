/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

const ContactInfo = ({ data, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer hover:bg-slate-900 px-4 py-2 ${
        data ? 'border-b-2 border-slate-600' : ''
      }`}
    >
      <img
        src={data ? data.photoURL : 'http://placekitten.com/200/300'}
        alt=""
        className="avatar"
      />
      <div>
        <span className="font-bold text-lg">
          {data ? data.displayName : 'Name'}
        </span>
        {/* {latestMsg ? <p className="text-sm text-slate-300">{latestMsg}</p> : ''} */}
      </div>
    </div>
  );
};

export default ContactInfo;
