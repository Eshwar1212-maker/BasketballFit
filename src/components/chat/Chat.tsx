import { Message } from "./Message";
import { GrAttachment } from "react-icons/gr";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BiImages } from "react-icons/bi";
import {
  AiOutlinePlusSquare,
  AiFillCloseCircle,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Chat = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="w-3/4 md:w-2/3 bg-slate-800 h-[100vh]  text-white relative">
      {isSidebarVisible && (
        <div className="hidden md:block">
          <Sidebar
            closeNav={toggleSidebar}
            close={<AiOutlineCloseCircle size={43} />}
          />
        </div>
      )}

      <div className="pb-[80px]">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="w-[76%] fixed bottom-0 md:w-2/3 px-2 py-2 ">
        <div className="bg-slate-200 py-[10px] h-[70px] rounded-lg flex text-black">
          <div className="w-[100%] flex flex-row gap-1">
            <input
              className="w-full rounded-xl px-3 py-1"
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
    </div>
  );
};
