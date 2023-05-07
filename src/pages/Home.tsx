import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import HomeScience from "../components/HomeScience";
import Community from "../components/Community";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { Backdrop } from "../components/Backdrop";
import Typewriter from "typewriter-effect";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [Backdrop, setBackdrop] = useState(false)

  const navigate = useNavigate();

  const signIn = () => {
    navigate("/login");
  };

  const logOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  const handleClickScroll = () => {
    const element = document.getElementById("homeScience");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="">
      <div className="m-auto py-[360px] md:max-w-[1000px] md:mt-[-60px] md:w-full h-screen md
      ;mx-auto text-center flex flex-col justify-center">
        <h1 className=" text-5xl md:text-5xl text-center border-b font-headerFonts md:py-6">
          Welcome To BasketballFit!
        </h1>
        <p className="text-md md:text-[39px] text-2xl">
          The all in one platform for you and your team to{" "}
          <span className="text-4xl md:text-6xl text-slate-400">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.pauseFor(2300).typeString("level up your game")
                .pauseFor(11000)
                .deleteAll().pauseFor(3000)
                .typeString("level up your game")
                .pauseFor(10000)
                .deleteAll().pauseFor(6000)
                .typeString("get to the next level")
                .start();
              }}
            />
          </span>
        </p>
        <p className="p-8 text-xs text-center lg:text-xl md:text-xl sm:text-sm">
          Log in to join our community of athletes who want to get better at the
          game we love!
        </p>
        <div className="flex flex-wrap justify-center gap-5">
  
          <div className="my-6">
        <button
          onClick={handleClickScroll}
          className="flex items-center px-4 py-3 border-2  text-md md:text-2xl group hover:text-white hover:bg-red-800 hover:border-red-800"
        >
          <span className="duration-300 group-hover:rotate-90">
            <HiArrowNarrowRight className="ml-3" />
          </span>
          Why us?
        </button>
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

      <div id="homeScience">
        <HomeScience />
      </div>

      <div id="one">
        <Community />
      </div>
    </div>
  );
};

export default Home