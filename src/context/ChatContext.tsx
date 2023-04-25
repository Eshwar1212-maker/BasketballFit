//@ts-nocheck comment 

import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export interface ChatContextValue {
  data: {
    chatId: any
    user: any;
  };
  dispatch: any;
}

export const ChatContext = createContext<ChatContextValue>({
  data: {
    chatId: "null",
    user: {},
  },
  dispatch: () => {},
});

export const ChatContextProvider: any= ({ children }: any) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };
  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        const newChatId =
          currentUser?.uid && action.payload?.uid
            ? currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid
            : "null";
  
        console.log('New Chat ID:', newChatId);
  
        return {
          user: action.payload,
          chatId: newChatId
        };
  
      default:
        return state;
    }
  };
  

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
