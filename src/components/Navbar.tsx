import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import {BsFillMoonStarsFill} from 'react-icons/bs'
import { useStateContext } from "../context/ThemeContext";


interface Nav {
  nav: boolean;
}

export const Navbar = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const [nav, setNav] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { theme, setColor } = useStateContext();
  const navigate = useNavigate();
  const toggleTheme = () => {
    if (theme.currentColor === "light") {
      setColor("dark");
    } else {
      setColor("light");
    }
    console.log("Theme:", theme);
  };
  
  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <div
        className={
          currentUser
            ? "flex justify-between m-auto p-5 py-8 h-[10px] cursor-pointer"
            : " flex justify-between m-auto p-4 py-8 h-[10px] text-white font-thin text-md cursor-pointer"
        }
      >
        <div className="text-3xl font-light flex flex-row gap-3">
          <div className="text-black">
            <Link className=" border-gray-600" to="/">
              <span className="text-orange-900 text-4xl border-b font-semibold">B</span>
              asketball
              <span className="text-orange-900 text-4xl border-b font-semiblack">F</span>it
            </Link>
          </div>

          <img
            className="w-[34px] h-[34px] rounded-full m-auto my-4"
            src="https://img.freepik.com/free-vector/hand-drawn-basket-ball_1034-756.jpg?w=1480&t=st=1681697574~exp=1681698174~hmac=8dfed6fc68ade2c3cdf9c06ed620f53c23f907846785c2e3951b191b3f083b96"
          />
        </div>
        <div className="hidden lg:block">
          <ul className="flex flex-row gap-6 px-[80px] rounded-lg text-black text-xl">
            {!currentUser && (
              <>
                <li className="border-b hover:bg-red-800 p-3 rounded-md hover:text-white">
                  <Link className="text-md " to="/register">
                    Register
                  </Link>
                </li>
                <li className="border-b hover:bg-red-800 p-3 rounded-lg hover:text-white">
                  <Link className="text-md" to="/login">
                    Log in
                  </Link>
                </li>
                <li className="border-b hover:bg-red-800 p-3 rounded-lg hover:text-white">
                  <Link className="text-md" to="/">
                    Home
                  </Link>
                </li>
              </>
            )}

            {currentUser && (
              <ul className="flex gap-5 text-[16px]">
                   <li onClick={toggleTheme} className="p-3 border-b border-gray-600">
                  <BsFillMoonStarsFill size={27}/>
                </li>
                <li className="p-3 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ...">
                  Gyms
                </li>
                <li className="p-3 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ...">
                  <Link
                    className="p-3 border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ..."
                    to="/Forum"
                  >Forums</Link>
                </li>
                <Link
                  className="p-3 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ..."
                  to="/ChatRooms"
                >
                  Messaging
                </Link>


                <li className="p-3 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ...">
                  <Link className="text-md" to="/UsersWorkouts">
                    Workouts
                  </Link>
                </li>
                <Link
                  className="p-3 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ..."
                  to="/"
                >
                  Home
                </Link>

                <li className="border-b">
                  <div className={" border-gray-600 "}>
                    <div>
                      {" "}
                      <img
                        onClick={() => navigate("/ProfilePage")}
                        className="w-[42px] h-[42px] rounded-3xl"
                        src={currentUser?.photoURL ?? ""}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <p className="text-sm">Account</p>
                </li>
              </ul>
            )}
          </ul>
        </div>
        <div onClick={() => setNav(!nav)} className=" lg:hidden">
          <RxHamburgerMenu onClick={() => setNav(!nav)} size={30} />
          {nav && (
            <motion.ul
              variants={variants}
              className={
                nav
                  ? "pt-[100px] flex flex-col fixed left-0 top-0 w-[60%] z-20 h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 text-white"
                  : "ease-in-out duration-500 fixed left-[-100%]"
              }
            >
              {!currentUser && <>
                <Link className="p-4 border-b border-gray-600" to="/register">
                  Register
                </Link>
                <Link className="p-4 border-b border-gray-600" to="/login">
                  Log in
                </Link>
                <Link className="p-4 border-b border-gray-600" to="/">
                  Home
                </Link>
              </>
              }

              {currentUser && (
                <>
                  <Link
                    className="p-4 border-b border-gray-600"
                    to="/UsersWorkouts"
                  >
                    My Workouts
                  </Link>
                  {/* <Link
                    className="p-4 border-b border-gray-600"
                    to="/ChatPage"
                  >
                    Individual Chats
                  </Link> */}

                  <Link
                    className="p-4 border-b border-gray-600"
                    to="/ChatRooms"
                  >
                    Chat Rooms
                  </Link>
                  <Link className="p-4 border-b border-gray-600" to="/Gyms">
                    Gyms
                  </Link>

                  <Link className="p-4 border-b border-gray-600" to="/ProfilePage">
                    Profile
                  </Link>

                  <Link
                    onClick={() => signOut(auth)}
                    className="p-4 border-b border-gray-600"
                    to="/Gyms"
                  >
                    Log Out
                  </Link>
                </>
              )}
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
};
