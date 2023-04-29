import { Backdrop } from "./Backdrop"
import { motion } from "framer-motion"


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

export const Modal = ({handleClose, text, handleSubmit}: any) => {

  return (
    <Backdrop
    onClick={handleClose}>
        <motion.div
        className="m-auto pb-0 pl-[2rem] flex flex-col items-center line-clamp-3"
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial= "hidden"
        animate="visible"
        exit="exit"
        >
                <form onSubmit={handleSubmit} className="flex flex-col max-w-[600px] bg-slate-800 p-9 rounded-2xl gap-4 text-xl">
                    <label>Workout Name</label>
                    <input className="rounded-2xl" placeholder="Enter name..."/>
                    <label>Workout Reps</label>
                    <input className="rounded-2xl" placeholder="Enter name..."/>
                    <label>Workout Sets</label>
                    <input className="rounded-2xl" placeholder="Enter name..."/>
                    <label>Workout Description</label>
                    <input className="rounded-2xl" placeholder="Enter name..."/>
                    <button className="p-3 rounded-md bg-slate-600 text-white">Add Workout</button>
                </form>
        </motion.div>
    </Backdrop>
  )
}
