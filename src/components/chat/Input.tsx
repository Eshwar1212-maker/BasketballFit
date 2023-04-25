

import { IoMdSend } from "react-icons/io";
import { AiFillPlusSquare } from "react-icons/ai";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const Input = () => {
  const [hover, setHover] = useState(false);
  const [hoverSend, setHoverSend] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState<any>(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log(data.chatId);


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
  const handleSend = async () => {
    console.log(data.chatId);
    
    if (!data.chatId) {
      console.error('Chat ID is missing or invalid');
      return;
    }
    if (img) {
      const storageRef = ref(storage, v4());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
        },
        (error) => {
          console.log("Error here" + error);
          console.log("id" + data.chatId);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: v4(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),

            });
            
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: v4(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser?.uid), {
        [data.chatId + ".lastMessage"]: {
          text,

        },
        [data.chatId + ".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,

      },
      [data.chatId + ".date"]: serverTimestamp(),
  })
    setText("")
    setImg(null)
  };
  return (
    <div className=" bottom-0 w-[100vh] cursor-pointer absolute">
      <br /> <br />
      <div className="flex">
        <div className="w-[98%]">    
          <input
          value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a message..."
            className="h-[40px] rounded-lg w-full text-black"
          />
        </div>
        <div className="flex gap-2 w-[2%] relative">
          <input
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImg(e.target.files[0]);
              }
            }}
            type="file"
            className="hidden"
            id="file"
          />
          <label htmlFor="file">
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
              onClick={handleSend} 
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
