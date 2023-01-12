import React from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Message = ({ msg }) => {
  const { curUser } = React.useContext(AuthContext);
  const { data } = React.useContext(ChatContext);

  const ref = React.useRef();

  const owner = msg.senderId === curUser.uid;

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  return (
    <div
      ref={ref}
      className={`flex items-start gap-5 mb-6 ${owner ? 'owner_msg' : ''}`}
    >
      <div className="flex flex-col gap-1">
        <img
          src={owner ? curUser.photoURL : data.user.photoURL}
          alt={owner ? curUser.displayName : data.user.displayName}
          className="avatar"
        />
        <span className="text-xs text-slate-700">{msg.date}</span>
      </div>
      <div className="max-w-[80%] flex flex-col gap-2">
        <p className={`${owner ? 'owner_p' : 'contact_p'}`}>{msg.text}</p>
        {msg.img && (
          <img
            src={msg.img}
            alt=""
            className={` w-1/2 rounded-md ${owner ? 'self-end' : ''}`}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
