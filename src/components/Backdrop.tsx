import React from 'react'
import {motion} from "framer-motion"



export const Backdrop = ({children, onClick}: any) => {
  return (
    <motion.div
    className='absolute top-0 left-0 h-[100%] w-[100%] bg-[#000000e1] flex items-center justify-center'
    onClick={onClick}
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity: 0}}

    >
            {
                children
            }

    </motion.div>
  )
}
