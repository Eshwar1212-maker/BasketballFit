import {IoMdSend} from 'react-icons/io'
import {AiFillPlusSquare} from "react-icons/ai"
import { useState } from 'react';


export const Input = () => {
  const [hover, setHover] = useState(false);
  const [hoverSend, setHoverSend] = useState(false);

  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  const onHoverSend = () => {
    setHoverSend(true);
  };
  const onLeaveSend = () => {
    setHoverSend(false);
  };

  return (
    <div className=" bottom-0 w-[100vh] cursor-pointer absolute">
      <br /> <br />
      <div className="flex">
        <div className="w-[98%]">
          <input
            placeholder="Enter a message..."
            className="h-[40px] rounded-lg w-full text-black"
          />
        </div>
        <div className="flex gap-2 w-[2%] relative">
          <input type='file' className='hidden' id='file'/>
          <label htmlFor='file'>
          <AiFillPlusSquare
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              role="button"
            
              size={30}
            />
          </label>
          {hover && (
            <p className="absolute p-2 text-white rounded-2xl bottom-full mb-1 text-sm font-thin">
              Upload images
            </p>
          )}
          <button className="mb-3">
            <IoMdSend 
                onMouseEnter={onHoverSend}
                onMouseLeave={onLeaveSend}
                role="button"
                size={30}
           />
          </button>
          {hoverSend && (
            <p className="pl-9 absolute p-2 text-white rounded-2xl bottom-full mb-4 text-sm font-thin w-fit">
              Send
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
