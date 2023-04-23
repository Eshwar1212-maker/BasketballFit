import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="border-b">
   
      <div className="flex justify-between px-4 bg-slate-900">
      <span className="py-3">{currentUser?.displayName}</span>

        <img className="w-[60px] h-[60px] rounded-full" src={currentUser?.photoURL}/>

      </div>
    </div>
  )
}
