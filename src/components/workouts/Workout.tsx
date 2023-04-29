import {AiFillEdit, AiOutlineDelete} from 'react-icons/ai'
interface Card {
  name: string,
  reps: number,
  sets: number
}

export const Workout = ({ name, reps, sets }: Card) => {
  return (
    <div className="flex justify-between gap-10">
      <div>
        <p>{name}</p>
      </div>
      <div className="flex gap-3">
        <p>Reps:{reps}</p>
        <p>Sets:{sets}</p>
        <AiFillEdit size={20}/>
        <AiOutlineDelete size={20}/>
      </div>
    </div>
  )
}
