import {
  AiOutlineEdit,
  AiOutlinePlusSquare,
  AiOutlineDelete,
} from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RiSendPlane2Fill } from "react-icons/ri";

export const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="x py-[200px] flex items-center flex-col px-11 gap-11 justify-center">
      <div className=" rounded-2xl border-4 border-slate-500 text-white flex flex-row gap-4 w-full sm:w-[700px] shadow-lg">
        <div className="flex items-center flex-col p-3">
          <img
            className="w-[150px] h-[150px] rounded-full"
            src={currentUser?.photoURL}
          />
          <h1 className="text-xl">{currentUser?.displayName}</h1>

          <p className="mb-4 text-sm">
            Currently logged in as {currentUser?.email}
          </p>
          <button className="py-2 px-4 bg-red-800 rounded-xl">Log Out</button>
        </div>
        <div className="hidden sm:block border-l border-gray-500"></div>
        <div className="flex flex-col gap-8 py-[80px]">
          <button className="text-center underline">Edit Photo</button>
          <button className="underline">Edit displayname</button>
        </div>
      </div>
 
    </div>
  );
};
