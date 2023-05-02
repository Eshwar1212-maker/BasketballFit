import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Community = ({toggleForm}: any) => {
  const goToForum = () => {};
  const signIn = async () => {};
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="w-full bg-black py-16 px-4 text-white">
      <div
        className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-4
    "
      >
        <img
          className="rounded-3xl w-[500px] mx-auto my-4"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <div className="flex flex-col justify-center">
          <p className="font-serif p-4">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Community that will keep eachother going
            </h1>
            <br />
          </p>
          <p>
            Create private group chats with either your team so you can stay in
            contact with eachother throughout your games and practices, or just
            your friends that you play pickup with! Join our forums, so you can 
            talk with other hoopers about whatever is on your mind about basketball, whether 
            your struggling through a slump, or want to share an accomplishment, theres always 
            someone who will listen!
          </p>
          {currentUser ? (
            <div className="flex gap-9">
                   <Link to="/ChatRooms">
              <button
                className="
        bg-white w-[200px] rounded-xl font-medium mx-auto my-6 py-3
        text-black transition ease-in-out delay-150 hover:-translate-y-1
        hover:scale-80 hover:bg-slate-500 duration-300 ... hover:text-white"
              >
                Group Chats
              </button>
            </Link>
            <Link to="/Forum">
              <button
                className="
        bg-white w-[200px] rounded-xl font-medium mx-auto my-6 py-3
        text-black transition ease-in-out delay-150 hover:-translate-y-1
        hover:scale-80 hover:bg-slate-500 duration-300 ... hover:text-white"
              >
                Forums
              </button>
            </Link>
            </div>
     
            
          ) : (
            <div className="flex gap-9">
                   <Link to="/register">
              <button
                className="
        bg-white w-[200px] rounded-xl font-medium mx-auto my-6 py-3
        text-black transition ease-in-out delay-150 hover:-translate-y-1
        hover:scale-80 hover:bg-slate-500 duration-300 ... hover:text-white"
              >
                Group Chats
              </button>
            </Link>
            <Link to="/register">
              <button
                className="
        bg-white w-[200px] rounded-xl font-medium mx-auto my-6 py-3
        text-black transition ease-in-out delay-150 hover:-translate-y-1
        hover:scale-80 hover:bg-slate-500 duration-300 ... hover:text-white"
              >
                Forums
              </button>
            </Link>
            </div>
     
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
