import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"




export const Message = ({message}: any) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef<null | HTMLDivElement>(null); 

useEffect(() => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);

  return (
    <div
     ref={ref} 
     className='flex flex-col px-8 text-md pb-1'>
      <div className=' flex justify-start gap-6'>
        <img 
        className='h-[37px] w-[37px] rounded-full my-3'  
        src={message.senderId === currentUser?.uid ? currentUser?.photoURL : data.user.photoURL}/>
        <p className='p-2 my-2 text-black bg-white rounded-xl'>Hey whats up</p>
      </div>
      <div className='flex justify-end gap-7'>
        <p className='my-3'>{message.text}</p>
        {message.img && <img className={message.img} />}
      </div>
    </div>
  )
}
