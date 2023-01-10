import React from 'react';

const ContactInfo = ({ latestMsg }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-900 px-4 py-2">
      <img src="http://placekitten.com/200/300" alt="" className="avatar" />
      <div>
        <span className="font-bold text-lg">Name</span>
        {latestMsg ? <p className="text-sm text-slate-300">{latestMsg}</p> : ''}
      </div>
    </div>
  );
};

export default ContactInfo;
