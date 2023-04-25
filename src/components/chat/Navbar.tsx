import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="border-b">
   
      <div className="flex justify-between px-4 bg-slate-900">
      <span className="py-5 underline">{currentUser?.displayName}</span>

        <img className="w-[53px] h-[53px] rounded-full my-3" src={currentUser?.photoURL ?? ""}/>

      </div>
    </div>
  )
}
