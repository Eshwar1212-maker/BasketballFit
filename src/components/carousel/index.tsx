import Forums from "./Forums"
import Profile from "./Profile"
import Messaging from "./Messaging"
import { Workouts } from "./Workouts"
import SkillWorkouts from "./SkillWorkouts"
import { Backdrop } from "../Backdrop"
import ImageSlider from "./ImageSlider"
import { motion } from "framer-motion"
import { useState } from "react"
import Welcome from "./Welcome"


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

const slides = [
    <Welcome />,
    <Workouts />,
    <SkillWorkouts />,
    <Messaging />,
    <Profile />,
    <Forums />,
]

export const Index = () => {
    const [showCarousel, setShowCarousel] = useState(true);

    const hideCarousel = () => {
      setShowCarousel(false);
      location.reload()
    };
    return (
        <div className="flex items-center justify-center mx-auto text-center py-[300px] h-screen w-[600px] text-black">
            {showCarousel && <Backdrop
            >
                <motion.div
                    className=""
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
      
                    <ImageSlider onHide={hideCarousel} slides={slides} />
       

                </motion.div>

            </Backdrop>}
        </div>
    )
}
