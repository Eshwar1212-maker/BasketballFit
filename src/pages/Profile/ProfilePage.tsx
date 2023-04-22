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
    <div className="min-h-screen py-12 flex items-center flex-col px-11 gap-11 justify-center">
      <div className=" rounded-2xl border-4 border-slate-500 text-white flex flex-row gap-4 w-full sm:w-[700px] shadow-lg">
        <div className="flex items-center flex-col p-3">
          <img
            className="w-[150px] h-[150px] rounded-full mb-4"
            src={currentUser?.photoURL}
          />
          <h1 className="text-3xl">{currentUser?.displayName}</h1>

          <p className="mb-4 text-xl">
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
      <h2 className="text-2xl">Add some of your highlights or make a post</h2>
      <div className="w-full h-[60px] sm:w-[700px] rounded-3xl border-4 bg-white border-slate-800 mt-[-40px]">
        <div className="bg-slate-600 py-[10px] h-[70px] rounded-lg flex text-black">
          <div className="w-[100%] flex flex-row gap-1">
            <input
              className="w-full rounded-xl h-full"
              type="text"
              placeholder="message..."
            />
            <div className="m-auto">
              <label className="" htmlFor="file">
                <AiOutlinePlusSquare size={34} />
              </label>
              <input id="image" type="file" className="hidden" />
            </div>
            <button>
              <RiSendPlane2Fill size={30} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-[700px] rounded-2xl shadow-lg overflow-hidden border-4 border-slate-500">
        <img
          className="w-full h-[400px] object-cover "
          src="https://i.ytimg.com/vi/lwGTm24-uj8/maxresdefault.jpg"
        />
        <div className="p-4">
          <h2 className="font-bold">Post Title</h2>
          <p>
            Add post description, comments, or other related information here.
          </p>
        </div>
        <button className="m-auto flex">
          <AiOutlineDelete size={35} />
        </button>
      </div>
    </div>
  );
};
