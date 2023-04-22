import background from "../../assets/background.mp4";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {}
  };

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/");
  };
  return (
    <div className="text-white relative h-screen my-[30px]">
      <video
        className="w-full h-full object-cover"
        src={background}
        autoPlay
        loop
        muted
      />

      <div className="bg-blue-50 flex flex-col py-[270px] items-center absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center cursor-pointer">
        <form onSubmit={handleSubmit} className="w-[230px] mx-auto mb-11">
          <input
            type="email"
            placeholder="email"
            className="block w-full rounded-xl mb-2 border text-black h-[50px] text-xl"
          />
          <input
            type="password"
            placeholder="password"
            className="block w-full rounded-xl mb-2 border text-black h-[50px] text-xl"
          />
          <button className="bg-blue-900 text-white block w-full font-first h-[46px] rounded-xl">
            <Link to="/register">Login</Link>
          </button>
          <p>Or log in with google</p>
          <a
            onClick={signIn}
            href="#_"
            className="relative inline-block text-lg group"
          >
            <span className="w-[230px] relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 w-[400px] bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative text-xl">
                <FcGoogle className="m-auto" size={40} />
              </span>
            </span>
          </a>

          <p>
            Dont have an account?
            <span className="cursor-pointer underline">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
