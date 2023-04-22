import { Sidebar } from "../../components/chat/Sidebar";
import { Chat } from "../../components/chat/Chat";
import { Message } from "../../components/chat/Message";

export const ChatPage = () => {
  return (
    <div>
      <div className="flex-row py-9 flex h-full items-center justify-center">
        <Sidebar close="" closeNav={() => {}} />
        <Chat />
      </div>
    </div>
  );
};
