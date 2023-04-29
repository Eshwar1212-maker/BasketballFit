import React from "react";
import { Link } from "react-router-dom";

const Science = () => {
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
          <Link to="/traininghome">
            <button
              className="bg-black w-[200px] rounded-xl font-medium mx-auto my-6 py-3 
            text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80
             hover:bg-slate-500 duration-300 ..."
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Science;
