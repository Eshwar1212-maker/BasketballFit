import { useEffect, useRef, useState } from "react"
import { ChatGroup } from "../../components/chatRooms/ChatGroup";



export const ChatRooms = () => {

  const [room, setRoom] = useState("")
  const [sendLink, setSendLink] = useState(false)
  const roomInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex justify-center py-[75px] m-auto h-[80vh] ">
   {room ? <><ChatGroup room={room}/></> :<div className=" w-[1500px] bg-cover bg-center bg-no-repeat rounded-2xl border-2 border-r-4 bg-[url('https://wp.usatodaysports.com/wp-content/uploads/sites/92/2018/12/bensimmons_phone1.jpg')]">
      <div className="text-center py-[300px] flex flex-col max-w-[700px] m-auto bg-opacity-20">
        <h1 className="text-3xl pb-6">Create group chats with your friends or team</h1>
      <h2 className="text-xl">Create a new chat room or enter an existing one</h2>
      <div className="flex flex-row border-2 borser-white rounded-2xl my-2">
      <input ref={roomInputRef} className="m-auto rounded-2xl text-xl h-[40px] text-center w-5/6 text-black" placeholder="Room name..." />

      <button 
        onClick={() => setRoom(roomInputRef.current?.value || "")}
        className="w-1/6
        text-white group p-2 rounded-xl flex items-center hover:bg-red-800 hover:border-red-800 text-[25px]">Enter </button>
      </div>
      
        <button 
        onClick={() => setSendLink(!sendLink)}
        className="text-xlw-[200px] rounded-xl font-medium 
                 mx-auto py-3transition ease-in-out delay-150 hover:scale-80 duration-300 ... underline">Send Room link to friend</button>
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
