import background from "../../assets/background.mp4";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) { }
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
      <div className="bg-blue-50 flex gap-3 flex-col md:py-[170px] items-center absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center cursor-pointer">
        <span className="text-2xl font-bold block mb-4">
          Login
        </span>
        <form onSubmit={handleSubmit} className="border-2 gap-2 p-2 px-6 rounded-lg bg-white text-black w-[400px] h-[340px] flex justify-center flex-col">
          <h1 className="text-black font-bold text-[20px] ">Email</h1>

          <input
            type="email"
            placeholder="email"
            className="block w-full p-3 rounded-xl mb-1 border text-black h-[40px] text-sm"
          />
          <h1 className="text-black font-bold text-[20px] ">Password</h1>
          <input
            type="password"
            placeholder="password"
            className="block w-full p-3 rounded-xl mb-1 border text-black h-[40px] text-sm"
          />
          <button className="bg-blue-900 text-white block w-full font-first h-[43px] rounded-xl">
            <Link to="/register">Login</Link>
          </button>
          <p className="text-[16px] py-2">
            Dont have an account?
            <span className="cursor-pointer underline">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
        <p className="text-[16px]">Or sign in with google</p>
        <a
          onClick={signIn}
          href="#_"
          className="relative inline-block text-lg group"
        >
          <span className="w-[380px] h-[52px] relative z-10 block px-1 py-1 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 w-[400px] bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative text-xl">
              <FcGoogle className="m-auto my-2" size={30} />
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};


export default Login