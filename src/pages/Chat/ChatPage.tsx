import { Chat } from "../../components/chat/Chat";
import { Sidebar } from "../../components/chat/Sidebar";

export const ChatPage = () => {
  return (
    <div className="flex justify-center py-[35px] h-screen">
      <div className="bg-slate-800 flex h-[800px] w-[1640px] rounded-2xl border-2 border-r-4 border-slate-400">
        <Sidebar />
        <Chat/>
      </div>
    </div>
  );
};
