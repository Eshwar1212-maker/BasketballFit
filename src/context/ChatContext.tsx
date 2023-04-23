import { createContext, useContext, useReducer, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export interface ChatContextValue {
    data: {
      chatId: string;
      user: any;
    };
    dispatch: React.Dispatch<any>;
  }
  

export const ChatContext = createContext<ChatContextValue>({
  data: {
    chatId: "null",
    user: {},
  },
  dispatch: () => {},
});

interface ChatContextProviderProps {
  children: any;
}

export const ChatContextProvider: any= ({ children }: any) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  type Action = { type: "CHANGE_USER"; payload: Record<string, unknown> };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid && action.payload?.uid
              ? currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
              : "null",
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
