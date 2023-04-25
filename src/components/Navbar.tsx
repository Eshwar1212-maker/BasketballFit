import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Fragment } from "react";
import { AiOutlineMessage, AiFillHome, AiTwotoneMessage } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import { CgGym } from "react-icons/cg";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { IoIosNotifications } from "react-icons/io";
import {
  BiMessageRoundedDetail,
  BiMessageSquareDetail,
  BiMessageRounded,
} from "react-icons/bi";

interface Nav {
  nav: boolean;
}

export const Navbar = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const [isOpen, setIsOpen] = useState(false);

  const [nav, setNav] = useState(false);
  const [theme, setTheme] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <div className="text-4xl font-light flex flex-row gap-3">
          <div>
            <Link className=" border-gray-600" to="/">
              <span className="text-orange-900 text-5xl border-b">B</span>
              asketball
              <span className="text-orange-900 text-5xl border-b">F</span>it
            </Link>
          </div>

          <img
            className="w-[34px] h-[34px] rounded-full m-auto my-4"
            src="https://img.freepik.com/free-vector/hand-drawn-basket-ball_1034-756.jpg?w=1480&t=st=1681697574~exp=1681698174~hmac=8dfed6fc68ade2c3cdf9c06ed620f53c23f907846785c2e3951b191b3f083b96"
          />
        </div>
        <div>
          <ul className="hidden lg:flex flex-row gap-6 px-10">
            <li
              onClick={() => {
                setTheme(!theme);
              }}
              className=""
            >
              {theme ? <BsFillMoonFill size={22} /> : <BsSunFill size={28} />}
            </li>
            {!currentUser && (
              <>
                <li className="border-b hover:bg-red-800 p-3 rounded-md">
                  <Link className="text-md " to="/register">
                    Register
                  </Link>
                </li>
                <li className="border-b hover:bg-red-800 p-3 rounded-lg">
                  <Link className="text-md" to="/login">
                    Log in
                  </Link>
                </li>
              </>
            )}

            <li className="border-b border-gray-600 transition ease-in-out delay-150 underline]">
              <Menu as="div" className="relative inline-block text-left">
                <div className=" border-gray-600 ">
                  <Menu.Button className=" gap-0 flex">
                    <CgGym size={30} />
                    <div className="m-auto">
                      <IoIosArrowDropdown size={22} />
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-3 flex flex-col pl-[60px] ">
                      <Menu.Item>
                        <Link
                          className="text-[19px] text-black hover: hover:text-slate-400 hover:rounded-2xl"
                          to="/WorkoutsPage"
                        >
                          My Workouts
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          className="text-[19px] text-black hover: hover:text-slate-400 hover:rounded-2xl"
                          to="/WorkoutsPage"
                        >
                          Weight Lifting
                        </Link>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
                Workouts
              </Menu>
              {/* <p className="mb-[-12px]">Workouts</p> */}
            </li>
            {currentUser && (
              <li className="border-b border-gray-600 transition ease-in-out delay-150 underline ">
                <Menu as="div" className="relative inline-block text-left">
                  <div className=" border-gray-600 transition ease-in-out delay-150 duration-300 ...">
                    <Menu.Button className="flex">
                      <div>
                        <BiMessageRounded
                          onClick={() => navigate("/ChatPage")}
                          size={24}
                        />{" "}
                      </div>

                      <div className="m-auto">
                        <IoIosArrowDropdown size={24} />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className=" text-black absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 flex flex-col pl-[50px]">
                        <Menu.Item>
                          <Link className="text-[19px] text-black hover: hover:text-slate-400 hover:rounded-2xl" to="/ChatPage">
                            Individual Chats
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link className="text-[19px] text-black hover: hover:text-slate-400 hover:rounded-2xl" to="/ChatRooms">
                            Chat Rooms
                          </Link>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <p>Messages</p>
              </li>
            )}

            <li className="border-b border-gray-600 transition ease-in-out delay-150 underline">
              <Link to="/">
                <AiFillHome className="w-[60px]" size={31} />
              </Link>
              <p className="pl-2">Home</p>
            </li>
            {/* <li className="">
              {" "}
              <IoIosNotifications className="w-[80px] my-[-4px]" size={37} />
              <p className="underline my-[-13px] py-1 text-[15px]">
                Notifications
              </p>
            </li> */}
            {currentUser && (
              <li>
                <Menu as="div" className="relative inline-block text-left">
                  <div className={" border-gray-600 hover:-translate-y-1 "}>
                    <Menu.Button className="flex my-[-10px]">
                      <div>
                        {" "}
                        <img
                          onClick={() => navigate("/ProfilePage")}
                          className="w-[48px] h-[48px] rounded-3xl"
                          src={currentUser.photoURL ?? ""}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="m-auto">
                        <IoIosArrowDropdown size={24} />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="text-black absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 flex flex-col gap-2 pl-[60px]">
                        <Menu.Item>
                          <li
                            className="text-[19px]"
                            onClick={() => signOut(auth)}
                          >
                            Log Out
                          </li>
                        </Menu.Item>

                        <Menu.Item>
                          <Link className="text-[19px]" to="/ProfilePage">
                            Profile
                          </Link>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <p className="my-[-10px] underline">Account</p>
              </li>
            )}
          </ul>
          <div onClick={() => setNav(!nav)} className="lg:hidden">
            <RxHamburgerMenu onClick={() => setNav(!nav)} size={30} />
            {nav && (
              <motion.ul
                variants={variants}
                className={
                  nav
                    ? "pt-[100px] flex flex-col fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 text-white"
                    : "ease-in-out duration-500 fixed left-[-100%]"
                }
              >
                        <Link
                          className="p-4 border-b border-gray-600" 
                          to="/WorkoutsPage"
                        >
                          My Workouts
                        </Link>
                        <Link
                          className="p-4 border-b border-gray-600" 
                          to="/WorkoutsPage"
                        >
                          Weight Lifting
                        </Link>
                <Link className="p-4 border-b border-gray-600" to="/ChatPage">
                  Individual Chats
                </Link>

                <Link className="p-4 border-b border-gray-600" to="/ChatRooms">
                  Chat Rooms
                </Link>

                <Link className="p-4 border-b border-gray-600" to="/Gyms">
                  Gyms
                </Link>
                {currentUser && (
                  <li>
                    <Menu as="div" className="relative inline-block text-left">
                      <div className={" border-gray-600 hover:-translate-y-1"}>
                        <Menu.Button className="flex">
                          <div>
                            {" "}
                            <img
                              onClick={() => navigate("/ProfilePage")}
                              className="w-[40px] h-[40px] rounded-full"
                              src={currentUser.photoURL ?? ""}
                            />
                          </div>
                          <div className="m-auto">
                            <IoIosArrowDropdown size={24} />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1 flex flex-col gap-2 pl-[120px]">
                            <Menu.Item>
                              <li onClick={logOut}>Log Out</li>
                            </Menu.Item>
                            <Menu.Item>
                              <Link className="text-sm" to="/ProfilePage">
                                Edit Account
                              </Link>
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                )}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
