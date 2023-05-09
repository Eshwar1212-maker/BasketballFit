import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

interface Props {
  room: string;
}
interface Message {
  text: string;
  createdAt: any;
  user: string;
  id: string;
}
export const ChatGroup = ({ room }: Props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = collection(db, "GroupMessages");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    const unsub = onSnapshot(queryMessages, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id } as Message);
      });
      messages.sort((a, b) => b.createdAt - a.createdAt); // sort messages in descending order
      setMessages(messages);
    });
    return () => unsub();
  }, [room]);

  useEffect(() => {
    scrollToBottom();

  }, [messages])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room,
    });
    setNewMessage("");
    scrollToBottom();
  };
  return (
    <div className="w-[300px] flex flex-col bg-gray-100 md:w-[800px] rounded-2xl h-[780px] relative py">
      <div className="w-full p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-black text-center underline">
          {room}
        </h1>
      </div>
      <div className="flex-grow w-full p-4 overflow-y-auto text-black">
        <div className="mb-4">
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <div
                key={message.id}
                className="flex justify-between border-b-4 p-2"
              >
                <div className="flex flex-col">
                  <p className="text-md" key={message.id}>
                    {message.text}
                  </p>

                  <p className="text-[10px] font-bold">
                    {message.createdAt?.seconds &&
                      new Date(
                        message.createdAt.seconds * 1000
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </p>
                </div>
                <p>-{message.user}</p>
              </div>
            ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-[300px] md:w-[800px] p-4 bg-gray-100 rounded-b-2xl pb-5"
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-4 mr-2 border rounded-2xl focus:outline-none text-black"
          placeholder="Your message..."
        />
        <button
          type="submit"
          className="p-2 md:px-6 md:py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};
