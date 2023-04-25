import React, { useContext, useEffect, useState } from 'react'
import { Message } from './Message'
import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'



export const Messages = () => {
  const [messages, setMessages] = useState<[] | any>([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    if (data.chatId) {
      const chatRef = doc(db, "chats", data.chatId);
      // use chatRef in your Firestore queries
    } else {
      console.error('Chat ID is missing or invalid');
      return;
    }
    
    const unSub = onSnapshot(doc(db,"chats", data.chatId || ""), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unSub()
    }
  }, [data.chatId])

  console.log(messages);
  
  
  return (
    <div className=''>
       {
        messages.map((m: any) => {
           <Message message={m} key={m.id}/>
        })
       }
    </div>
  )
}
