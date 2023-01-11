import React from 'react';

const Message = () => {
  const owner = true;

  return (
    <div className={`flex items-start gap-5 mb-6 ${owner ? 'owner_msg' : ''}`}>
      <div className="flex flex-col gap-1">
        <img src="https://placekitten.com/200/300" alt="" className="avatar" />
        <span className="text-xs text-slate-700">Just now</span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-2">
        <p className={`${owner ? 'owner_p' : 'contact_p'}`}>Lorem</p>
        <img
          src="https://placekitten.com/500/500"
          alt=""
          className={` w-1/2 rounded-md ${owner ? 'self-end' : ''}`}
        />
      </div>
    </div>
  );
};

export default Message;
