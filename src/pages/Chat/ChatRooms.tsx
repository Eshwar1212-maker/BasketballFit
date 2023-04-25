import { useEffect, useRef, useState } from "react"
import { ChatGroup } from "../../components/chatRooms/ChatGroup";



export const ChatRooms = () => {

  const [room, setRoom] = useState("")
  const [sendLink, setSendLink] = useState(false)
  const roomInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex justify-center py-[75px]">
   {room ? <><ChatGroup room={room}/></> :<div className="bg-slate-800 h-[700px] w-[1400px] rounded-2xl border-2 border-r-4 border-slate-400">
      <div className="text-center py-[200px] flex flex-col max-w-[600px] m-auto">
        <h1 className="text-3xl pb-6">Create group chats with your friends or team</h1>
      <h2 className="text-xl pb-2">Enter room name</h2>
        <input ref={roomInputRef} className="rounded-2xl text-2xl h-[50px] text-center text-black" placeholder="Room name..." />
        <button 
        onClick={() => setRoom(roomInputRef.current?.value || "")}
        className="text-3xl bg-slate-400 w-[200px] rounded-xl font-medium 
                 mx-auto my-6 py-3 text-black transition ease-in-out delay-150 hover:scale-80 hover:bg-slate-500 duration-300 ...">Enter chat</button>
        <button 
        onClick={() => setSendLink(!sendLink)}
        className="text-xl bg-slate-400 w-[200px] rounded-xl font-medium 
                 mx-auto my-6 py-3 text-black transition ease-in-out delay-150 hover:scale-80 hover:bg-slate-500 duration-300 ...">Send Room link to friend</button>
    { sendLink && <><input placeholder="Email... " className="rounded-2xl w-[300px] h-[45px] text-black m-auto text-center text-xl"/>
                <button 
                onClick={() => setSendLink(!sendLink)}
                className="text-md bg-slate-400 w-[110px] rounded-xl font-medium 
                 mx-auto my-3 py-2 text-black transition ease-in-out delay-150 hover:scale-80 hover:bg-slate-600 duration-300 hover:text-white ...">Send</button></>   }
      </div>
      
    </div>}

  </div>
  )
}
