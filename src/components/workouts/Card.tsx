


interface Card{
    name: string,
    reps: number,
    sets: number
}

export const Card = ({name, reps, sets}: Card) => {
  return (
    <div className="flex flex-row text-xl justify-between border-4 border-black">
        <h2>{name}</h2>
        <p>Reps:{reps}</p>
        <p>Sets:{sets}</p>
    </div>
  )
}
