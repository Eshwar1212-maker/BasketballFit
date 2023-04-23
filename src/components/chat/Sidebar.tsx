import { Navbar } from "./Navbar"
import { Search } from "./Search"
import {Chats} from "./Chats"

export const Sidebar = () => {
  return (
    <div className='w-1/6 bg-slate-800 h-full overflow-hidden border-2 border-slate-300 rounded-xl'>
        <Navbar />
        <Search />
        <Chats />
    </div>
  )
}
