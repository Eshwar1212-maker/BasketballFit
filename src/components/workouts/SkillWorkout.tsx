import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';

interface Workout {
  title: string,
  reps: number,
  sets: number,
  _id: string,
  onDeleteWorkout?: any,
  description?: string,
  firebaseUserId?: string,
  date?: string,
  month?: string
}

const SkillWorkout = ({ reps, sets, _id, onDeleteWorkout, description, title }: Workout) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // stop event propagation

    fetch(`https://basketballfit-production.up.railway.app/skill-workouts/${_id}`, {
      method: 'DELETE'
    })
      .then((res) => { res.json();
      })
      .then((data) => {
        console.log('Workout deleted successfully:', data);
        if (onDeleteWorkout) {
          onDeleteWorkout(_id);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className={"flex justify-between border-black border-b-2 flex-col"}>
        <div>
          <div>
            <h2 className='text-[13px] underline'>{title}</h2>
          </div>
          <div className="flex flex-col">
            <div className='flex gap-2 '>
              <p className='text-[12px]'>Reps:{reps}</p>
              <p className='text-[12px]'>Sets:{sets}</p>
            </div>
          </div>
        </div>
        <div>
          <p className='text-[13px] font-display'>{description}</p>
        </div>
        <button onClick={handleDelete}>
          <AiOutlineDelete size={19} />
        </button>
      </div>
    </div>
  )
}
export default SkillWorkout