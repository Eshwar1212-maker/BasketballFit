import React from 'react'
import {AiOutlineMore, AiOutlineSearch} from "react-icons/ai"
import { Messages } from './Messages'
import { Input } from './Input'

export const Chat = () => {
  return (
    <div className='w-5/6 h-full flex flex-col relative'>
        <div className='bg-slate-900 h-[62px] flex justify-between px-9 cursor-pointer'>
            <p className='py-5 text-sm'>Conversation with <span className='py-5 underline text-[18px]'>Damian</span></p>
            <div className='py-4'><AiOutlineMore size={36}/></div>
        </div>
        <div className='flex-1 overflow-scroll'>
        <Messages />
        </div>
        <Input />
    </div>
  )
}
