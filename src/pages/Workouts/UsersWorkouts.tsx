import React, { useContext, useEffect, useState } from 'react'
import { generateDate } from '../../utils/calender'
import { months } from '../../utils/calender'
import dayjs from 'dayjs'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import cn from '../../utils/cn'
import { Workout } from '../../components/workouts/Workout';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai'
import { Modal } from '../../components/Modal';
import { Backdrop } from '../../components/Backdrop';
import { motion } from 'framer-motion';


const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0

  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500
    }

  },
  exit: {
    y: "100vh",
    opacity: 0
  }
}
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
  const [modalOpen, setModalIsOpen] = useState(false)

  const close = () => setModalIsOpen(!modalOpen)
  const open = () => setModalIsOpen(true)



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
          title: workoutName, reps: workoutReps, sets: workoutSets
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
    setSelectedWorkouts([...selectedWorkouts, { title: workoutName, reps: workoutReps, sets: workoutSets }])
    setModalIsOpen(false)

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
        <h1 className='underline pb-2 text-center text-blue-900 font-bold text-xl'>{selectDate.toDate().toDateString()}</h1>

        {selectedWorkouts.length === 0 &&
          (
            <div className='text-gray-400 text-lg py-[59px]'>
              Take all the rest you need today {currentUser?.displayName}
              <img className='w-[370px] h-[380px] py-10 rounded-[270px]' src='https://i0.wp.com/sportsmedicineweekly.com/wp-content/uploads/2021/07/tips-for-better-sleep.png?fit=1080%2C600&ssl=1' />
            </div>

          )
        }        <div>
          {selectedWorkouts.map((workout: any) => (
            <Workout key={workout.id} name={workout.title} reps={workout.reps} sets={workout.sets} />
          ))}
        </div>
        {modalOpen &&
          <Backdrop
          >
            <motion.div
              className="m-auto pb-0 pl-[2rem] flex flex-col items-center line-clamp-3"
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form onSubmit={handleSubmit} className="flex flex-col max-w-[600px] bg-slate-50 p-10 rounded-xl gap-3 text-xl text-center font-bold">
                <label>Workout Name</label>
                <input
                  value={workoutName}
                  type='text'
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter name..."
                  onChange={(e) => setWorkoutName(e.target.value)}
                />

                <label> Reps</label>
                <input
                  value={workoutReps}
                  type='number'
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter reps..."
                  onChange={(e) => setWorkoutReps(e.target.valueAsNumber)}

                />
                <label> Sets</label>
                <input
                  value={workoutSets}
                  type='number'
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter sets..."
                  onChange={(e) => setWorkoutSets(e.target.valueAsNumber)}

                />
                <label> Weight(optional)</label>
                <input
                  type='number'

                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter weight..." />
                <label>Notes(optional)</label>
                <input
                  className="rounded-md text-center h-20 border-2 border-black"
                  placeholder="Enter description..." />
                <button className="p-3 rounded-md bg-slate-600 text-white hover:bg-slate-400">Add Workout</button>
              </form>
            </motion.div>
          </Backdrop>}

        <div className='pb-11'>
          {
            modalOpen ?
              <AiOutlineCloseCircle
                className='fixed bottom-4 h-[50px] mb-11 rounded-full bg-slate-100 w-fit hi-fit cursor-pointer'
                onClick={close}
                size={20} /> :
              (
                <>
                  <AiOutlinePlusSquare
                    className='fixed bottom-4 h-[400px] cursor-pointer  ml-[170px]'
                    onClick={close}
                    size={40} />
                  <h1 className='fixed bottom-4 h-[170px] cursor-pointer  ml-[150px]'>Add Workout</h1>

                </>
              )
          }
        </div>
      </div>
    </div>
  )
}
export default UsersWorkouts