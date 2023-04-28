import { useEffect, useState } from "react";
import { Card } from "../../components/workouts/card";
import { useNavigate } from "react-router-dom";

export const Workouts = () => {
  const [workouts, setWorkouts] = useState([])
  const navigate = useNavigate()

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch('https://exerciseapi3.p.rapidapi.com/search', {
  //         method: "GET",
  //         headers: {
  //           "content-type": "application/octet-stream",
  //           "X-RapidAPI-Key": "cecb4d9962mshfe5e344b99e439dp141533jsnaa095c45a44a",
  //           "X-RapidAPI-Host": "exerciseapi3.p.rapidapi.com"
  //         }
  //       });
  //       const data = await response.json();
  //       console.log(JSON.stringify(data));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getData();
  // }, []);
  


  return (
    <div className="flex justify-center m-auto py-[140px]">

      <div className="text-2xl flex h-[90px] flex-col px-[250px]">
        <h1>Search through our workouts and add it to your calender</h1>
        <br />
        <div className="flex m-auto border-4 border-black rounded-2xl">
          <input
            className="rounded-lg w-[100%] h-[34px] text-black text-[20px]"
            placeholder="Search workouts..."
          />
        </div>
        <div className="border-2 border-slate-900 my-3 w-[760px] m-auto rounded-full"></div>
        <div className="w-[400px] m-auto border-none flex flex-col gap-2">
        <Card name="Bench Press" reps={3} sets={4} />
        <Card name="Bench Press" reps={3} sets={4} />
        <Card name="Bench Press" reps={3} sets={4} />

        </div>
        <button 
        onClick={() => navigate("/UsersWorkouts")}
        className="text-sm underline py-11">My Workouts</button>

        <p className="text-[15px] fixed bottom-20">Cant find a workout? Dont worry! Add as many custom workouts as you want in your <span className="underline">Calender</span></p>
      </div>
    </div>
  );
};
