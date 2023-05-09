import profile from "../../assets/profile.png"


const Profile = () => {
  return (
    <div>
    <div className="">
      <img className="h-[590px] mx-auto w-[400px]" src={profile}/>
      <p className=" text-sm w-[700px]">
        Navigate to your profile page, and you will see how consistent you have been. We track 
        how many days you have hit the gym, and we also track your intensity per month. This is calcualted based
        off of how many exercises you add. Over the course of a few months, you can look back at your calender 
        and see what changes need to be made if any!
      </p>
    </div>
  </div>
  )
}

export default Profile