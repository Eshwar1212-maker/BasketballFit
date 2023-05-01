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
      
        <button 
        onClick={() => setSendLink(!sendLink)}
        className="bottom-3 fixed m-auto rounded-xl font-medium underline">Send Room link to friend</button>
    { sendLink && <><input placeholder="Email... " className="rounded-2xl w-[300px] h-[45px]  m-auto text-center text-xl"/>
                <button 
                onClick={() => setSendLink(!sendLink)}
                className="text-md bg-slate-400 w-[110px] rounded-xl font-medium 
                 mx-auto py-2transition ease-in-out delay-150 hover:scale-80 duration-300 hover:text-white ...">Send</button></> 
      }

      </div>
    </div>
    }
  </div>
  )
}
export default ChatRooms