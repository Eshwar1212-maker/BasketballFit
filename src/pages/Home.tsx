import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { useContext } from "react";
import Typed from "react-typed";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import HomeScience from "../components/HomeScience";
import Community from "../components/Community";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const signIn = () => {
    navigate("/login");
  };

  const logOut = async () => {
    await signOut(auth);
    Navigate("login");
  };

  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="border-b font-headerFonts text-center text-white md:text-5xl sm-text-6xl text-4xl md:py-6">
          Welcome To BasketballFit!
        </h1>
        <p className="text-[50px] font-bold">
          The all in one platform for you and your team to{" "}
          <span className="text-slate-400 text-[57px] font-bold">
            <Typed
              strings={["  level up your game"]}
              typeSpeed={40}
              backSpeed={200}
              loop
            />
          </span>
        </p>
        <p className="text-white text-center p-8 lg:text-2xl md:text-xl sm:text-xs">
          Log in to join our community of athletes who want to get better at the
          game we love!
        </p>
        <div className="flex justify-center gap-5">
          <div className="">
            {!currentUser ? (
              <button
                className="text-3xl bg-slate-400 w-[200px] rounded-xl font-medium 
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
                  className="text-white text-xl bg-slate-600 w-[100px] rounded-xl font-medium 
               mx-auto my-6 py-3 transition ease-in-out delay-150
                hover:-translate-y-1 hover:scale-80 hover:bg-slate-800 duration-300 ..."
                >
                  Log Out
                </button>
              </>
            )}
          </div>
          <div className="my-6">
            <Link
              to="workoutsPage"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <button className="text-white text-3xl group border-2 px-6 py-3 flex items-center hover:bg-red-800 hover:border-red-800">
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
            className="rounded-full w-[110px] h-[110px]"
            src="https://img.freepik.com/free-vector/hand-drawn-basket-ball_1034-756.jpg?w=1480&t=st=1681697574~exp=1681698174~hmac=8dfed6fc68ade2c3cdf9c06ed620f53c23f907846785c2e3951b191b3f083b96"
          />
        </motion.div>
      </div>
      <HomeScience />
      <Community />
    </div>
  );
};
