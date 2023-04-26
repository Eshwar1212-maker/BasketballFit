import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import HomeScience from "../components/HomeScience";
import Community from "../components/Community";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import {
  Link as LinkScroll,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const signIn = () => {
    navigate("/login");
  };

  const logOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  const handleClickScroll = () => {
    const element = document.getElementById('one');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="text-white">
    <div className="w-[] py-[360px] md:max-w-[1000px] md:mt-[-60px] md:w-full h-screen m-auto text-center flex flex-col justify-center">
      <h1 className="border-b font-headerFonts text-center text-white md:text-[84px] md:py-6">
        Welcome To BasketballFit!
      </h1>
      <p className="text-md md:text-[49px] text-2xl">
        The all in one platform for you and your team to{" "}
        <span className="text-slate-400 md:text-[43px] sm:text-2xl">level up your game</span>
      </p>
      <p className="text-white text-center p-8 lg:text-xl md:text-xl sm:text-sm text-xs">
        Log in to join our community of athletes who want to get better at the
        game we love!
      </p>
      <div className="flex justify-center gap-5 flex-wrap">
        <div className="">
        <div className="">
            {!currentUser ? (
              <button
                className="text-lg md:text-2xl bg-slate-400 w-[150px] md:w-[230px] rounded-xl font-medium 
               mx-auto my-6 py-3 text-black transition ease-in-out delay-150
                hover:-translate-y-1 hover:scale-80 hover:bg-slate-500 duration-300 ..."
                onClick={signIn}
              >
                Sign In!
              </button>
            ) : (
              <>
                <button
                  onClick={logOut}
                  className="text-white md:text-xl bg-slate-600 w-[100px] rounded-xl font-medium 
               mx-auto my-6 py-3 transition ease-in-out delay-150
                hover:-translate-y-1 hover:scale-80 hover:bg-slate-800 duration-300 ..."
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
        <div className="my-6">
            <Link
              to="workoutsPage"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <button onClick={handleClickScroll} className="text-white text-md md:text-2xl group border-2 px-6 py-3 flex items-center hover:bg-red-800 hover:border-red-800">
                <span className="group-hover:rotate-90 duration-300">
                  <HiArrowNarrowRight className="ml-3" />
                </span>
                Why us?
              </button>
            </Link>
          </div>
      </div>
      <motion.div
          initial={{ opacity: -10, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        >
          <img
            id="box"
            className="rounded-full w-[70px] h-[70px]"
            src="https://img.freepik.com/free-vector/hand-drawn-basket-ball_1034-756.jpg?w=1480&t=st=1681697574~exp=1681698174~hmac=8dfed6fc68ade2c3cdf9c06ed620f53c23f907846785c2e3951b191b3f083b96"
          />
        </motion.div>
    </div>

    <HomeScience />

    <div id="one">
      <Community />
    </div>
  </div>
);
};

  