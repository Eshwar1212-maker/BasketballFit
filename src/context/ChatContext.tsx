// import React, {
//     createContext,
//     useContext,
//     useReducer,
//     Dispatch,
//     ReactNode,
//   } from "react";
//   import { AuthContext } from "./AuthContext";

//   type UserType = {
//     uid: string;
//     [key: string]: any;
//   };

//   type ChatState = {
//     chatId: string;
//     user: UserType;
//   };

//   type ChatAction = {
//     type: "CHANGE_USER";
//     payload: UserType;
//   };

//   type ChatContextValue = {
//     data: ChatState;
//     dispatch: Dispatch<ChatAction>;
//   };

//   const INITIAL_STATE: ChatState = {
//     chatId: "null",
//     user: {},
//   };

//   export const ChatContext = createContext<ChatContextValue | undefined>(
//     undefined
//   );

//   type ChatContextProviderProps = {
//     children: ReactNode;
//   };

//   export const ChatContextProvider = ({
//     children,
//   }: ChatContextProviderProps): JSX.Element => {
//     const { currentUser } = useContext(AuthContext);

//     const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
//       switch (action.type) {
//         case "CHANGE_USER":
//           return {
//             user: action.payload,
//             chatId:
//               currentUser?.uid? > action.payload.uid
//                 ? currentUser.uid + action.payload.uid
//                 : action.payload.uid + currentUser.uid,
//           };

//         default:
//           return state;
//       }
//     };

//     const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//     return (
//       <ChatContext.Provider value={{ data: state, dispatch }}>
//         {children}
//       </ChatContext.Provider>
//     );
//   };
