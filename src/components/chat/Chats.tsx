import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";


export const Chats = () => {
  const [chats, setChats] = useState<any[]>([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(collection(db, "userChats"), currentUser?.uid),
        (doc: any) => {
          setChats(doc.data())
        }
      );
      return () => {
        unsub()
      }
    }
    currentUser?.uid && getChats()
  }, [currentUser?.uid]);
  const handleSelect = (u: any) => {
      dispatch({type: "CHANGE_USER", payload: u})
  }
  return (
      <div className="flex px-4 border-b justify-between hover:bg-slate-700 cursor-pointer">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
  return (
    <div
      className="flex justify-between gap-11"
      key={chat[0]}
      onClick={() => handleSelect(chat[1].userInfo)}
    >
      <img className="w-[49px] h-[49px] rounded-full" src={chat[1].userInfo.photoURL} alt="" />
      <div className="flex py-3 underline text-lg">
        <span>{chat[1].userInfo.displayName}</span>
        <p>{chat[1].lastMessage?.text}</p>
      </div>
    </div>
  );
})}
      </div>
  );
};
