import {AiFillEdit, AiOutlineDelete} from 'react-icons/ai'
interface Card {
  name: string,
  reps: number,
  sets: number
}

export const Workout = ({ name, reps, sets }: Card) => {
  return (
    <div className="flex justify-between gap-10 border-b border-s borde-b-6 rounded-2xl">
      <div>
        <p className='underline'>{name}</p>
      </div>
      <div className="flex gap-3">
        <p className='text-sm pb-3'>Reps:{reps}</p>
        <p className='text-sm pb-3'>Sets:{sets}</p>
        <AiFillEdit size={24}/>
        <AiOutlineDelete size={24}/>
      </div>
    </div>
  )
}
