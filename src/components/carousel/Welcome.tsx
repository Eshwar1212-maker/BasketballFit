import { useContext } from "react"
import welcome from "../../assets/Welcome.png"
import { AuthContext } from "../../context/AuthContext"



const Welcome = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div>
      <h1 className="border-b-4 border-b-black text-2xl">Welcome {currentUser?.displayName}!</h1>
    <div className="">
      <img className="h-[500px] w-full z-10" src={welcome}/>
      <p className="text-xl w-[700px] mx-auto">
        Welcome! We're so glad you decided to create an account with us. Here, at BasketballFit it is our goal to make your life easier
        as a basketball player, we can track your workouts, let you chat with your friends and teams, and have a community forum where you 
        can talk to other players on the platform, browser through our slides to see how to use our platform!
      </p>
    </div>
  </div>
  )
}

export default Welcome