import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Science = () => {
  const navigate = useNavigate()
  const [toggleForm, setToggleForm] = useState(false)
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="w-full bg-white py-16 px-4 text-black" id="science">
      <div
        className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-4
        "
      >
        <img
          className="rounded-3xl w-[500px] mx-auto my-4"
          src="https://basketballforever.com/wp-content/uploads/2020/07/Bradley-Beal.jpg"
          alt=""
        />
        <div className="flex flex-col justify-center">
          <p className="font-serif p-4">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Let us track your workouts
            </h1>
            <br />
            Let us make it easier for you when it comes to tracking. Use our calender for both skill workouts, and weight lifting
            workouts, where we will track everything for you, so you can program your progress.
          </p>
          {!currentUser ? <Link to="/register">   <button
            className="bg-black w-[200px] rounded-xl font-medium mx-auto my-6 py-3 
            text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80
             hover:bg-slate-500 duration-300 ..."
          >
            Get Started
          </button></Link> : 
          <Link to="/UsersWorkouts">   <button
          className="bg-black w-[200px] rounded-xl font-medium mx-auto my-6 py-3 
          text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80
           hover:bg-slate-500 duration-300 ..."
        >
          Get Started
        </button></Link> 
          }


        </div>
      </div>
    </div>
  );
};

export default Science;
