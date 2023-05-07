import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommunityImage from "../utils/other";

const Community = ({ toggleForm }: any) => {
  const goToForum = () => { };
  const signIn = async () => { };
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="w-full py-16 px-4 text-black md:bg-black md:text-white">
      <div
        className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-4
    "
      >
        <CommunityImage />
        <div className="flex flex-col justify-center">
          <p className="font-serif p-4">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Community that will keep eachother going
            </h1>
            <br />
          </p>
          <p className="w-[370px] md:w-full">
            Create private group chats with either your team so you can stay in
            contact with eachother throughout your games and practices, or just
            your friends that you play pickup with! Join our forums, so you can
            talk with other hoopers about whatever is on your mind about basketball, whether
            your struggling through a slump, or want to share an accomplishment, theres always
            someone who will listen!
          </p>
          {currentUser ? (
            <div className="flex gap-9 py-3">
              <Link to="/ChatRooms">
                <button
                  className="flex items-center px-6 py-3 border-2 rounded-2xl  text-md md:text-xl group hover:text-white hover:bg-red-900 hover:border-red-900"

                >
                  Group Chats
                </button>
              </Link>
              <Link to="/Forum">
                <button
                  className="flex items-center px-11 py-3 border-2 rounded-2xl  text-md md:text-xl group hover:text-white hover:bg-red-900 hover:border-red-900"

                >
                  Forums
                </button>
              </Link>
            </div>


          ) : (
            <div className="flex gap-9">
              <Link to="/register">
                <button
                  className="flex items-center px-4 py-3 border-2 rounded-2xl  text-md md:text-xl group hover:text-white hover:bg-red-900 hover:border-red-900"

                >
                  Group Chats
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="flex items-center px-11 py-3 border-2 rounded-2xl  text-md md:text-xl group hover:text-white hover:bg-red-900 hover:border-red-900"

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
