import { Chat } from "../../components/chat/Chat";
import { Sidebar } from "../../components/chat/Sidebar";




 const ChatPage = () => {
  return (
    <div className="flex justify-center py-[75px]">
      <div className="bg-slate-800 flex h-[1100px] w-[2240px] rounded-2xl border-2 border-r-4 border-slate-400">
        <Sidebar />
        <Chat/>
      </div>
    </div>
  );
};

export default ChatPage