import { useEffect, useRef, useState } from "react";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatGroup } from "../../components/chatRooms/ChatGroup";



const ChatRooms = () => {

  const [room, setRoom] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [rooms, setRooms] = useState<string[]>([]);
  const roomInputRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    const messagesRef = collection(db, "GroupMessages");
    const q = query(messagesRef, orderBy("room"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomNamesSet: Set<string> = new Set();
      snapshot.forEach((doc) => {
        const roomName = doc.get("room");
        if (roomName) {
          roomNamesSet.add(roomName);
        }
      });
      setRooms(Array.from(roomNamesSet));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredRooms = rooms.filter((roomName) =>
    roomName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleRoomClick = (roomName: string) => {
    setRoom(roomName);
  };

  return (
    <div className="w-[330px] md:w-full flex justify-center py-[70px] h-[100vh]">

      {room ? (
        <ChatGroup room={room} />
      ) : (
        <div className="w-[800px] bg-cover border-black bg-center bg-no-repeat rounded-2xl">
          <h1 className="text-3xl pb-6 text-center py-11">
            Create group chats with your friends or team
            <p className="text-xl py-4 font-light">
              Join an existing room or create a new room
            </p>
          </h1>
          <div className="flex flex-row border-4 border-black rounded-2xl my-2 w-[800px] bg-white">
            <input
              ref={roomInputRef}
              className="m-auto rounded-2xl text-xl text-center h-16 text-black w-5/6"
              placeholder="New room name..."
              onChange={handleSearchInputChange} // add this line

            />

            <button
              onClick={() => setRoom(roomInputRef.current?.value || "")}
              className="
              w-1/6 group rounded-xl border-black border-2 flex justify-center py-3
               text-black text-lg md:text-[25px]text-black"
              >
                Enter
          </button>
          </div>


          <div className="text-center flex flex-col max-w-[700px] m-auto bg-opacity-20">
            <h1 className="text-xl underline">Current Rooms</h1>
            <div className="h-[400px] overflow-y-scroll text-black">
              {filteredRooms.map((roomName) => (
                <button
                  key={roomName}
                  onClick={() => handleRoomClick(roomName)}
                  className="w-full p-2 my-1 bg-slate-200 rounded-xl  hover:bg-blue-100"
                >
                  {roomName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {room &&
       <>
        <button onClick={() => { location.reload() }} className="fixed bottom-0 pb-11 mb-[1px] text-3xl underline p-1 cursor-pointer">Exit</button>
       </>
      }    </div>
  );
};

export default ChatRooms;
