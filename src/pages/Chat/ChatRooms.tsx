import { useEffect, useRef, useState } from "react"
import { ChatGroup } from "../../components/chatRooms/ChatGroup";



const ChatRooms = () => {

  const [room, setRoom] = useState("")
  const [sendLink, setSendLink] = useState(false)
  const roomInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex justify-center py-[75px] m-auto h-[100vh]">
   {room ? <><ChatGroup room={room}/></> :<div className=" w-[800px] bg-cover border-black bg-center bg-no-repeat rounded-2xl">
   <h1 className="text-3xl pb-6 text-center py-11">Create group chats with your friends or team</h1>
      <h2 className="text-xl text-center">Create a new chat room or enter an existing one</h2>
      <div className="text-center py-[200px] flex flex-col max-w-[700px] m-auto bg-opacity-20">

      <div className="flex flex-row border-4 border-black rounded-2xl my-2">
      <input ref={roomInputRef} className="m-auto rounded-2xl text-xl h-[40px] text-center w-5/6 text-black p-0" placeholder="Room name..." />

      <button 
        onClick={() => setRoom(roomInputRef.current?.value || "")}
        className="w-1/6
         group p-1 rounded-xl flex items-center border-black border-left-2 text-[25px]">Enter </button>
      </div>
      </div>
    </div>
    }
  </div>
  )
}
export default ChatRooms