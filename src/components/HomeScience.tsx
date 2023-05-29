import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import chart from "../assets/chart.png"



const Science = () => {
  const navigate = useNavigate()
  const [toggleForm, setToggleForm] = useState(false)
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="w-fullpy-16 px-4" id="science">
      <div
        className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-4
        "
      >
        <img
          className="w-[500px] h-[367px] mx-auto my-4"
          src={chart}
          alt=""
        />
        <div className="flex flex-col justify-center">
          <p className="font-serif p-4">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Let us track your workouts
            </h1>
            <br />
            Let us make it easier for you when it comes to tracking. Use our calender for both skill workouts, and weight lifting
            workouts, where we will track everything for you, and then navigate to your profile page to see what months you workout the most, 
            so you can see whether your program needs to be adjusted based off of your perfomance on the court or in the gym.
            </p>
          {!currentUser ? <Link to="/register">   <button
          className="flex items-center px-4 py-3 border-2 rounded-2xl  text-md md:text-xl group hover:text-white hover:bg-red-800 hover:border-red-800"

          >
            Get Started
          </button></Link> : 
          <Link to="/UsersWorkouts">   <button
          className="flex items-center px-4 py-3 border-2 rounded-2xl  text-md md:text-xl group hover:text-white hover:bg-red-800 hover:border-red-800"

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
{/* <button
onClick={handleClickScroll}
className="flex items-center px-4 py-3 border-2  text-md md:text-2xl group hover:text-white hover:bg-red-800 hover:border-red-800"
>
<span className="duration-300 group-hover:rotate-90">
  <HiArrowNarrowRight className="ml-3" />
</span>
Why us?
</button> */}