import React, { useContext, useEffect, useState } from 'react'
import { generateDate } from '../../utils/calender'
import { months } from '../../utils/calender'
import dayjs from 'dayjs'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import cn from '../../utils/cn'
import { Workout } from '../../components/workouts/Workout';
import { AuthContext } from '../../context/AuthContext';


const UsersWorkouts = () => {
  const { currentUser } = useContext(AuthContext)

  console.log(generateDate());
  const [selectedWorkouts, setSelectedWorkouts] = useState<any[]>([])
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState<any>(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [workoutName, setWorkoutName] = useState("")
  const [workoutReps, setWorkoutReps] = useState(0)
  const [workoutSets, setWorkoutSets] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3001/workouts/user/${currentUser?.uid}/date/${selectDate.toDate().toDateString()}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedWorkouts(data);
      })
      console.log("Workouts from this user: " + selectedWorkouts);

  }, [selectDate]);
  // use the selectedWorkouts array to render the workouts on the calendar UI
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = selectDate.toDate().toDateString(); // use selected date from state
    try {
      fetch(`http://localhost:3001/workouts/${currentUser?.uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:workoutName, reps:workoutReps, sets:workoutSets
          , date: selectDate.toDate().toDateString()
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Workout posted successfully:', data);

        })
        .catch((error) => console.error('Error posting workout:', error));
    } catch (error) {
      console.log(error);

    }
    let newItem = {}
    setSelectedWorkouts([...selectedWorkouts, {title:workoutName, reps:workoutReps, sets:workoutSets}])
  };
  console.log(selectDate.toDate().toDateString());


  return (
    <div className='flex sm:flex-col py-[140px] md:flex md:flex-row gap-20 cursor-pointer justify-center'>
      <div className=''>
        <h1 className='text-2xl mb-1 text-center font-semibold'>Weight lifting tracker</h1>
        <div className='flex-basis-[100%] md:flex-basis-[33.33%] h-97 border-4 border-slate-200 rounded-2xl h-fit p-4'>
          <div className='flex justify-between pb-3'>
            <h1 className='text-sm underline'>
              <GrFormPrevious
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
                size={25} /></h1>
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>            <h1 className='text-sm underline'>
              <GrFormNext
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
                size={25} />
            </h1>
          </div>

          <div className='w-full grid grid-cols-7 mb-2 gap-9 pl-4 font-semibold text-[18px]'>
            {days.map((day, index) => {
              return <h1 key={index}>{day}</h1>;
            })}
          </div>
          <div className='grid grid-cols-7 gap-6 py-3'>
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today
                          ? "bg-blue-300 text-white"
                          : "",
                        selectDate
                          .toDate()
                          .toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className=' px-5'>
        <h1>{selectDate.toDate().toDateString()}</h1>

        <h1 className='text-gray-400 text-lg'>No tasks for today</h1>
        <div>
          {selectedWorkouts.map((workout: any) => (
            <Workout key={workout.id} name={workout.title} reps={workout.reps} sets={workout.sets} />
          ))}
        </div>
        <div className=''>
          <form onSubmit={handleSubmit} className='flex flex-col text-center md:fixed bottom-3 h-[380px] w-96'>
            <input
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              name="title"
              className='text-center border-slate-600 border-2 rounded-2xl p-1'
              placeholder='Workout name' />
            <input
              type='number'
              value={workoutReps}
              onChange={(e) => setWorkoutReps(e.target.valueAsNumber)}
              name="reps"
              className='text-center border-slate-600 border-2 rounded-2xl p-1'
              placeholder='Workout reps' />
            <input
              type='number'
              value={workoutSets}
              onChange={(e) => setWorkoutSets(e.target.valueAsNumber)}
              name="sets"
              className='text-center border-slate-600 border-2 rounded-2xl p-1'
              placeholder='Workout sets' />
            <button
              type="submit"
              className='border-2 rounded-2xl bg-slate-500 text-white border-slate-600 hover:rounded-2xl mt-4'>
              Add workout</button>
          </form>
        </div>
      </div>

    </div>
  )
}
export default UsersWorkouts