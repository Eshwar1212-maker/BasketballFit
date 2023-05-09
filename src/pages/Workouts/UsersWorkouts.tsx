import React, { useContext, useEffect, useState } from 'react';
import { generateDate } from '../../utils/calender';
import { months } from '../../utils/calender';
import dayjs from 'dayjs';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import cn from '../../utils/cn';
import { Workout } from '../../components/workouts/Workout';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import { Backdrop } from '../../components/Backdrop';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { ExerciseDropdown } from "../../components/ExerciseDropDown"
import {exercises} from "../../utils/excercises"
import SkillWorkouts from '../SkillWorkouts';



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
};

const UsersWorkouts = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { currentUser } = useContext(AuthContext);
  console.log(generateDate());
  const [selectedWorkouts, setSelectedWorkouts] = useState<any[]>([])
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState<any>(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [workoutName, setWorkoutName] = useState("")
  const [workoutReps, setWorkoutReps] = useState<number | null>(null);
  const [workoutSets, setWorkoutSets] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [modalOpen, setModalIsOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [completedWorkoutsDays, setCompletedWorkoutsDays] = useState<Set<string>>(new Set());
  const close = () => setModalIsOpen(!modalOpen)
  const [filteredExercises, setFilteredExercises] = useState(exercises);


  useEffect(() => {
    fetch(`http://localhost:4000/workouts/user/${currentUser?.uid}/date/${selectDate.toDate().toDateString()}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedWorkouts(data);
      })
    console.log("Workouts from this user: " + selectedWorkouts);
    console.log("Date in fetch " + selectDate.toDate().toDateString());


  }, [selectDate]);
  // use the selectedWorkouts array to render the workouts on the calendar UI
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const workoutData: any = {
      title: workoutName,
      reps: workoutReps,
      sets: workoutSets,
      firebaseUserId: currentUser?.uid,
      date: selectDate.toDate().toDateString(),
      month: selectDate.format("MMMM"),
      description: description
    };
    if (weight !== null) {
      workoutData.weight = weight;
    }

    try {
      fetch(`http://localhost:4000/workouts/${currentUser?.uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Workout posted successfully:', data);
        })
        .catch((error) => console.error('Error posting workout:', error));
    } catch (error) {
      console.log(error);
    }
    setSelectedWorkouts([...selectedWorkouts, { title: workoutName, reps: workoutReps, sets: workoutSets, weight: weight, description: description }]);
    setModalIsOpen(false);
    setWorkoutName("");
    setWorkoutReps(0);
    setWorkoutSets(0);
    setWeight(null);
    setDescription("");
  };

  const updateDelete = (workoutId: string) => {
    const updatedWorkouts = selectedWorkouts.filter((workout) => workout._id !== workoutId);
    setSelectedWorkouts(updatedWorkouts);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value.toLowerCase();
    setWorkoutName(filterValue);
    const filteredArray = exercises.filter((exercise) => {
      return exercise.toLowerCase().includes(filterValue);
    });
    setFilteredExercises(filteredArray);
  };



  return (
    <div className='flex sm:flex-col py-[120px] md:flex md:flex-row gap-20 cursor-pointer justify-center h-screen'>
      <div className=''>
        <h1 className='text-2xl mb-1 text-center font-semibold'>Weight lifting tracker</h1>
        <div className='flex-basis-[100%] md:flex-basis-[33.33%] h-97 border-4 border-slate-200 rounded-2xl p-4 w-[800px] h-fit'>
          {true &&
            <div className='flex justify-between pb-3'>
              <h1 className='text-sm underline'>
                <GrFormPrevious
                  onClick={() => {
                    setToday(today.month(today.month() - 1));
                  }}
                  size={25}
                  className={theme === "darkMode" ? 'bg-white rounded-full' : ''}
                /></h1>
              <h1 className="select-none font-semibold">
                {months[today.month()]}, {today.year()}
              </h1>            <h1 className='text-sm underline'>
                <GrFormNext
                  onClick={() => {
                    setToday(today.month(today.month() + 1));
                  }}
                  size={25}
                  className={theme === "darkMode" ? 'bg-white rounded-full' : ''}

                />
              </h1>
            </div>
          }

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
                          ? "bg-blue-300"
                          : "",
                        selectDate
                          .toDate()
                          .toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white  transition-all cursor-pointer select-none"
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
          </div>x
        </div>
      </div>
      <div className=' px-5'>
        <h1 className='underline pb-2 text-center text-blue-900 font-bold text-xl'>{selectDate.toDate().toDateString()}</h1>
        {selectedWorkouts.length === 0 &&
          (
            <div className='text-gray-400 text-lg py-[59px]'>
             <p className=''>Rest is important, take all of it need today {currentUser?.displayName}</p> 
              <img className=' mx-auto w-[370px] h-[380px] py-5 rounded-[10px]' src='https://i0.wp.com/sportsmedicineweekly.com/wp-content/uploads/2021/07/tips-for-better-sleep.png?fit=1080%2C600&ssl=1' />
            </div>
          )
        }        <div>
          {selectedWorkouts.map((workout) => {
            if (workout && workout.title) {
              return (

                <Workout
                  onDeleteWorkout={updateDelete}
                  key={workout.id}
                  title={workout.title}
                  reps={workout.reps}
                  sets={workout.sets}
                  weight={workout.weight}
                  description={workout.description}
                  _id={workout._id}
                  firebaseUserId={workout.firebaseUserId}
                  date={workout.date}
                  month={workout.month}
                />
              );
            }
            return null;
          })}
        </div>
        {modalOpen &&
          <Backdrop
          >
            <motion.div
              className=""
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

              <form onSubmit={handleSubmit} className="flex text-black flex-col w-[400px] p-7 rounded-xl gap-3 text-xl text-center font-bold bg-slate-200">
                <label>Workout Name</label>
                <input
                  value={workoutName}
                  type='text'
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter name..."
                  onChange={handleFilter} />
                <div>
                  {workoutName.length > 0 && filteredExercises.length > 0 && (
                    <ExerciseDropdown
                      exercises={filteredExercises}
                      onSelectExercise={(exercise) => {
                        setWorkoutName(exercise);
                        setWorkoutName(exercise);
                        setFilteredExercises([]);
                      }}
                    />
                  )}
                </div>

                <label> Reps</label>
                <input
                  value={workoutReps !== null ? workoutReps : ''}
                  type='number'
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter reps..."
                  onChange={(e) => setWorkoutReps(e.target.valueAsNumber)}

                />
                <label> Sets</label>
                <input
                  value={workoutSets !== null ? workoutSets : ''}
                  type='number'
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter sets..."
                  onChange={(e) => setWorkoutSets(e.target.valueAsNumber)}
                />
                <label> Weight(optional)</label>
                <input
                  type='number'
                  value={weight !== null ? weight : ''}
                  onChange={(e) => setWeight(e.target.valueAsNumber)}
                  className="rounded-md text-center p-2 border-2 border-black"
                  placeholder="Enter weight..." />
                <label>Notes(optional)</label>
                <input
                  className="rounded-md text-center h-20 border-2 border-black"
                  placeholder="Example: Make sure form is good"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button className="p-3 rounded-md bg-slate-600 hover:bg-slate-400 text-white ">Add workout</button>
                <AiOutlineCloseCircle
                  className='mx-auto h-[30px] rounded-full w-fit hi-fit cursor-pointer'
                  onClick={close}
                  size={0} />
              </form>
            </motion.div>

          </Backdrop>}
        <div className='pb-11'>
          {
            !modalOpen &&

            <div className={selectedWorkouts.length === 0 ? 'cursor-pointer my-[0px]' : 'cursor-pointer my-[100px]'}>
              <AiOutlinePlusSquare
                className={selectedWorkouts.length === 0 ? 'cursor-pointer ml-[159px]' : 'cursor-pointer ml-[159px]'}
                onClick={close}
                size={40} />
              <h1 className=' cursor-pointer ml-[99px]'>Add a workout for today</h1>
            </div>

          }
        </div>

      </div>
    </div>
  )
}
export default UsersWorkouts