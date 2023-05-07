import { GrFormAdd } from 'react-icons/gr'
import { AiOutlinePlusSquare, AiOutlineCloseCircle } from 'react-icons/ai';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ExerciseDropdown } from '../components/ExerciseDropDown';
import { Backdrop } from '../components/Backdrop';
import SkillWorkout from '../components/workouts/SkillWorkout';

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

const SkillWorkouts = () => {
  const { currentUser } = useContext(AuthContext)
  const [allWorkouts, setAllWorkouts] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState(0)
  const [sets, setSets] = useState(0)
  const [description, setDescription] = useState("")
  const [currentDay, setCurrentDay] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // Fetch workouts for the authenticated user
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:4000/skill-workouts/user/${currentUser?.uid}`);
      const data = await response.json();
      setAllWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  const updateDelete = (workoutId: string) => {
    const updatedWorkouts = allWorkouts.filter((workout) => workout._id !== workoutId);
    setAllWorkouts(updatedWorkouts);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newWorkout = {
      title,
      reps,
      sets,
      description,
      day: currentDay,
      userId: currentUser?.uid
    };

    const response = await fetch(`http://localhost:4000/skill-workouts/${currentUser?.uid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorkout),
    });

    const addedWorkout = await response.json();
    setAllWorkouts([...allWorkouts, addedWorkout]);
    setTitle('');
    setReps(0);
    setSets(0);
    setDescription('');
    setModalOpen(false);
  };

  const renderWorkoutsForDay = (day: any) => {
    return allWorkouts
      .filter((workout) => workout.day === day)
      .map((workout) => (
        <SkillWorkout
          _id={workout._id}
          key={workout._id}
          date={workout.day}
          title={workout.title}
          reps={workout.reps}
          sets={workout.sets}
          onDeleteWorkout={updateDelete}
          description={workout.description}
        />
      ));
  };

  return (
    <div className="h-[100vh] items-center py-[110px]">
      <h1 className='flex justify-center pb-3 text-xl'>Create your weekly program for your skill workouts</h1>
      <div className='flex gap-0 justify-center cursor-pointer h-[88%]'>
        <div
          onClick={() => setCurrentDay("Monday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll '
        >
          <h1 className='border-b-2 border-b-black'>Monday</h1>
          <div className=' flex flex-col bg-[#d8effc] text-black'>
            <div className="flex flex-col ">{renderWorkoutsForDay("Monday")}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentDay("Tuesday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll'
        >
          <h1 className='border-b-2 border-b-black'>Tuesday</h1>
          <div className='flex flex-col bg-[#d8effc] text-black'>
            <div className="flex flex-col ">{renderWorkoutsForDay("Tuesday")}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentDay("Wednesday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll'
        >
          <h1 className='border-b-2 border-b-black'>Wednesday</h1>
          <div className=' flex flex-col bg-[#d8effc] text-black'>
            <div className=" flex flex-col ">{renderWorkoutsForDay("Wednesday")}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentDay("Thursday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll'
        >
          <h1 className='border-b-2 border-b-black'>Thursday</h1>
          <div className=' flex flex-col bg-[#d8effc] text-black'>
            <div className="flex flex-col ">{renderWorkoutsForDay("Thursday")}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentDay("Friday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll'
        >
          <h1 className='border-b-2 border-b-black'>Friday</h1>
          <div className='flex flex-col bg-[#d8effc] text-black'>
            <div className="py-1 flex flex-col ">{renderWorkoutsForDay("Friday")}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentDay("Saturday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll'
        >
          <h1 className='border-b-2 border-b-black'>Saturday</h1>
          <div className='flex flex-col bg-[#d8effc] text-black'>
            <div className="flex flex-col ">{renderWorkoutsForDay("Saturday")}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentDay("Sunday")}
          onClickCapture={(e) => {
            // Check if the user clicked on the empty space inside the div
            if (e.target === e.currentTarget) {
              setModalOpen(!modalOpen);
            }
          }}
          className='border-2 border-black w-[159px] overflow-y-scroll'
        >
          <h1 className='border-b-2 border-b-black'>Sunday</h1>
          <div className='flex flex-col bg-[#d8effc] text-black'>
            <div className="flex flex-col ">{renderWorkoutsForDay("Sunday")}</div>
          </div>
        </div>
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
              <p className='underline text-[26px]'>Add a drill for {currentDay}</p>
              <label>Drill</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className="rounded-md text-center p-2 border-2 border-black"
                placeholder="Ex: shooting, or dribbling"
              />
              <div>
              </div>
              <label> Reps</label>
              <input
                value={reps}
                onChange={(e) => setReps(e.target.valueAsNumber)}
                type='number'
                className="rounded-md text-center p-2 border-2 border-black"
                placeholder="Enter reps..."

              />
              <label> Sets</label>
              <input
                value={sets}
                onChange={(e) => setSets(e.target.valueAsNumber)}
                type='number'
                className="rounded-md text-center p-2 border-2 border-black"
                placeholder="Enter sets..."
              />
              <label>Notes(optional)</label>
              <input
                className="rounded-md text-center h-20 border-2 border-black"
                placeholder="Ex: Make sure form is good"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="p-3 rounded-md bg-slate-600 hover:bg-slate-400 text-white ">Add workout</button>
              <AiOutlineCloseCircle
                className='mx-auto h-[30px] rounded-full w-fit hi-fit cursor-pointer'
                onClick={() => setModalOpen(!modalOpen)}
                size={0} />
            </form>
          </motion.div>
        </Backdrop>}
      <p className='flex justify-center'>Click on a day to add a drill for that specific day!</p>
    </div>
  )
}

export default SkillWorkouts



//  <button className="m-auto flex py-10"><span className=''><GrFormAdd className='m-auto' size={26}/></span>Add Workout</button>