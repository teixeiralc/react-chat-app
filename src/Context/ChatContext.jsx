import React from 'react';
import { AuthContext } from './AuthContext';

export const ChatContext = React.createContext();

export const ChatContextProvider = ({ children }) => {
  const { curUser } = React.useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            curUser.uid > action.payload.uid
              ? curUser.uid + action.payload.uid
              : action.payload.uid + curUser.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = React.useReducer(chatReducer, INITIAL_STATE);

  const value = React.useMemo(() => {
    return { data: state, dispatch };
  }, [state]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
