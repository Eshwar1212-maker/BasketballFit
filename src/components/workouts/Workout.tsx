import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

interface Workout {
  title: string,
  reps: number,
  sets: number,
  _id: string,
  onDeleteWorkout: any
  description?: string,
  weight?: number,
  firebaseUserId: string,
  date: string,
  month: string
}


export const Workout = ({ reps, sets, _id, onDeleteWorkout, description, weight, title }: Workout) => {
  console.log("this is the id " + _id);
  const handleDelete = () => {
    fetch(`http://localhost:4000/workouts/${_id}`, {
      method: 'DELETE'
    })
      .then((res) => { res.json();
      })
      .then((data) => {
        console.log('Workout deleted successfully:', data);
        onDeleteWorkout(_id)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
<div className={"flex justify-between gap-1 border-black border-b-2 flex-col relative"}>
  <div>
    <div>
      <p className=''>{title}</p>
    </div>
    <div className="flex flex-col">
      <div className='flex gap-7'>
        <p className='text-sm pb-1'>Weight:{weight}</p>
        <p className='text-sm pb-1'>Reps:{reps}</p>
        <p className='text-sm pb-1'>Sets:{sets}</p>
        <div className='flex absolute right-0 top-0'>
          <input type='checkbox' className="mr-2" />
          <AiOutlineDelete onClick={handleDelete} size={24} />
        </div>
      </div>
    </div>
  </div>
  <div>
    <p className='text-sm pb-2'>{description}</p>
  </div>
</div>

   
  )
}