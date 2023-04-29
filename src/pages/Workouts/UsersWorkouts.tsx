import React, { useEffect, useState } from 'react'
import { generateDate } from '../../utils/calender'
import { Card } from '../../components/workouts/card'
import { months } from '../../utils/calender'
import dayjs from 'dayjs'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import cn from '../../utils/cn'

const UsersWorkouts = () => {
  console.log(generateDate());
  const [workouts, setWorkouts] = useState<any[]>([])
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState<any>(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  useEffect(() => {
    fetch('http://localhost:3001/workouts')
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data)
        console.log(data);

      })
  }, [])
  const addWorkoutSubmit = (e: any) => {
    e.preventDefault()

  }
  console.log(selectDate.toDate().toDateString());
  

  return (
    <div className='flex sm:flex-col py-[150px] md:flex md:flex-row gap-20 cursor-pointer justify-center'>
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
        <div className='hidden'>
          <form onSubmit={addWorkoutSubmit} className='flex flex-col text-center md:fixed bottom-3 h-[380px] w-96'>
            <input className='text-center border-slate-600 border-2 rounded-2xl p-1' placeholder='Workout name' />
            <input className='text-center border-slate-600 border-2 rounded-2xl p-1' placeholder='Workout reps' />
            <input className='text-center border-slate-600 border-2 rounded-2xl p-1' placeholder='Workout sets' />
            <button className='border-2 rounded-2xl bg-slate-500 text-white border-slate-600 hover:rounded-2xl mt-4'>Add workout</button>
          </form>
          <p className='fixed bottom-3 h-[246px] text-sm underline px-[160px]'>Hide</p>
        </div>
      </div>

    </div>
  )
}
export default UsersWorkouts