import { Chat } from "../../components/chat/Chat";
import { Sidebar } from "../../components/chat/Sidebar";

export const ChatPage = () => {
  return (
    <div className="flex justify-center py-[60px]">
      <div className="bg-slate-800 flex items-center h-[780px] w-[1780px] rounded-2xl justify-center border-2 border-r-4 border-slate-400">
        <Sidebar />
        <Chat/>
      </div>
    </div>
  );
};
