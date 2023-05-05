import { useState } from "react"


export const NewsWidget = () => {
    const [showWidget, setShowWidget] = useState(true)
    return (
        <div className='border-4 border-black rounded-2xl ml-[170px] w-[300px] p-4 font-bold absolute top-1/2 transform -translate-y-1/2 left-0'>
            {showWidget && <div className="flex flex-col justify-center items-center">
                <p>Latest headlines in the NBA</p>
                <img
                    className="w-[299px] h-[299px] rounded-md"
                    src="https://www.rollingstone.com/wp-content/uploads/2023/03/GettyImages-1463499694.jpg"
                />
                <p className="text-sm">Grizzlies drop Dillion Brooks, the whole team will need to be humbled in order to be contenders. Their superstar Morant is especailly included.</p>
            </div>}
            <button
                onClick={() => setShowWidget(!showWidget)}
                className="text-sm underline font-light">{showWidget ? <>Hide</> : <>Unhide</>}</button>
        </div>
    )
}
