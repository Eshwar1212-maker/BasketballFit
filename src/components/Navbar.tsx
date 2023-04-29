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
import { motion } from "framer-motion";


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
        <div className="text-2xl font-light flex flex-row gap-3">
          <div className="text-black">
            <Link className=" border-gray-600" to="/">
              <span className="text-orange-900 text-3xl border-b">B</span>
              asketball
              <span className="text-orange-900 text-3xl border-b">F</span>it
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
              <ul className="flex gap-4">
                <Link
                  className="p-4 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ..."
                  to="/ChatRooms"
                >
                  Messaging
                </Link>

                <li className="p-4 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ...">
                  Forums
                </li>
                <li className="p-4 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ...">
                  <Link className="text-md" to="/UsersWorkouts">
                    Workouts
                  </Link>
                </li>

                <Link
                  className="p-4 border-b border-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 duration-300 ..."
                  to="/"
                >
                  Home
                </Link>
                <li className="border-b">
                  <Menu as="div" className="relative inline-block text-left">
                    <div className={" border-gray-600 "}>
                      <Menu.Button className="flex">
                        <div>
                          {" "}
                          <img
                            onClick={() => navigate("/ProfilePage")}
                            className="w-[42px] h-[42px] rounded-3xl"
                            src={currentUser?.photoURL ?? ""}
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
                <Link className="p-4 border-b border-gray-600" to="/register">
                  Register
                </Link>
                <Link className="p-4 border-b border-gray-600" to="/login">
                  Log in
                </Link>
                <Link className="p-4 border-b border-gray-600" to="/">
                  Home
                </Link>

                {currentUser && (
                  <>
                    <Link
                      className="p-4 border-b border-gray-600"
                      to="/UsersWorkouts"
                    >
                      My Workouts
                    </Link>
                    <Link
                      className="p-4 border-b border-gray-600"
                      to="/ChatPage"
                    >
                      Individual Chats
                    </Link>

                    <Link
                      className="p-4 border-b border-gray-600"
                      to="/ChatRooms"
                    >
                      Chat Rooms
                    </Link>
                    <Link className="p-4 border-b border-gray-600" to="/Gyms">
                      Gyms
                    </Link>

                    <Link className="p-4 border-b border-gray-600" to="/Gyms">
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
