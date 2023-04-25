import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

interface Props {
  room: string;
}

export const ChatGroup = ({ room }: Props) => {
  const navigate = useNavigate()

  const [newMessage, setNewMessage] = useState("")
  const messagesRef = collection(db, "GroupMessages")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newMessage === "") return
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      room
    })
    setNewMessage("")
  }
  function navigateBack() {
    navigate("/ChatRooms")
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 w-[800px] rounded-2xl h-[80vh] relative">
    <div className="w-full p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-black text-center">{room}</h1>
    </div>
    <div className="flex-grow w-full p-4 overflow-y-auto">
      <div className="mb-4">
        {/* Chat messages go here */}
      </div>
    </div>
    <form onSubmit={handleSubmit} className="flex items-center bottom-0 fixed w-[800px] p-4 bg-gray-100 rounded-b-2xl pb-5">
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-grow p-4 mr-2 border rounded-lg focus:outline-none"
        placeholder="Your message..."
      />
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  </div>
  )
}
{/* <div className="fixed bottom-3">
<button
  className="fixed bottom-8 right-8 p-4 text-gray-800 rounded-full hover:bg-gray-200"
  onClick={navigateBack}
>
  <MdOutlineKeyboardBackspace size={32} />
</button>
</div> */}