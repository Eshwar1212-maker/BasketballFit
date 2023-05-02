import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-auto py-[100px] px-11 mx-10 md:mx-0 md:-ml-16">
         Recent activity
         
      </div>
      <div className="w-full md:w-auto py-[100px] flex items-center flex-col px-11 gap-11 justify-center">
        <div className="rounded-2xl border-4 border-slate-500 flex flex-col md:flex-row gap-4 w-full md:w-[600px] shadow-lg">
          <div className="flex items-center flex-col p-3">
            <img
              className="w-[150px] h-[150px] rounded-full"
              src={currentUser?.photoURL}
            />
            <h1 className="text-xl">{currentUser?.displayName}</h1>
            <p className="mb-4 text-sm">
              Currently logged in as {currentUser?.email}
            </p>
            <button
              onClick={logOut}
              className="py-2 px-4 bg-red-800 rounded-xl text-white"
            >
              Log Out
            </button>
          </div>
          <div className="hidden sm:block border-l border-gray-500"></div>
          <div className="flex flex-col gap-8 py-[80px]">
            <button className="text-center underline">Edit Photo</button>
            <button className="underline">Edit displayname</button>
          </div>
        </div>
        <div>
          <img src="https://apexcharts.com/wp-content/uploads/2018/05/area-chart-spline.svg" />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
