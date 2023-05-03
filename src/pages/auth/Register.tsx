import { useState, ChangeEvent, FormEvent } from "react";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import background from "../../assets/background.mp4";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { z, ZodType } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

const Register = () => {
  const [err, setErr] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    await setDoc(doc(db, "userChats", result.user.uid), {});
    navigate("/");
    console.log(result.user);
  };

  const handleSubmitRegister = async (data: Formdata) => {
    setLoading(true);

    const { displayName, email, password } = data;
    
    const fileInput = document.querySelector("#file");
    const file = fileInput?.files && fileInput?.files.length > 0 ? fileInput?.files[0] : null;
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // If the user uploaded an image, proceed with the image upload process
      if (file) {
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              console.log(res.user);

              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        });
      } else {
        // If the user didn't upload an image, proceed without the image upload process
        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });
        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  //ZOD CONGIGURATION
  type Formdata = {
    displayName: string
    email: string
    password: string
  }
  const schema: ZodType<Formdata> = z.object({
    displayName: z.string().min(2).max(25),
    email: z.string().email(),
    password: z.string().min(6).max(20)
  })
  const { register, handleSubmit, formState: { errors } } = useForm<Formdata>({ resolver: zodResolver(schema) })
  return (
    <div className=" text-white relative h-screen my-[30px]">
      <video
        className="w-full h-full object-cover"
        src={background}
        autoPlay
        loop
        muted
      />
      <div className="bg-blue-50 flex items-center flex-col md:py-[160px] absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center cursor-pointer">
        <span className="text-2xl font-bold block mb-4">
          Create an account!
        </span>

        <form onSubmit={handleSubmit(handleSubmitRegister)} className="border-2 p-3 rounded-lg bg-white w-[400px] h-[300px] flex flex-col justify-between">
          <h2 className="flex start">Username:</h2>
          <h1 className="text-black font-bold text-sm text-[11px] ">Username</h1>
          <input
            required
            type="text"
            placeholder="username"
            {...register("displayName")}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black text-sm"
          />{errors.displayName && <p className="text-orange-900 text-sm">Please make a username with more than one character</p>}
          <h1 className="text-black font-bold text-sm text-[11px] " >Email</h1>

          <input
            required
            type="email"
            placeholder="email"
            {...register("email")}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black text-sm"
          />
          {errors.email && <p className="text-orange-900">Please use a valid email </p>}

          <h1 className="text-black text-[14px] font-bold">Password</h1>

          <input
            required
            type="password"
            placeholder="password"
            {...register("password")}
            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black text-sm"
          />
          {errors.password && <p className="text-orange-900 text-sm">Please use a password with more than 6 characters</p>}
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
          />

          <label htmlFor="file" className="cursor-pointer">
            <span className="text-black hover:text-indigo-300 text-lg underline">
              Add a profile picture
            </span>
          </label>
          <button
            disabled={loading}
            className="bg-blue-900 text-white block w-full font-first h-[46px] rounded-xl"
          >
            Sign up
          </button>
          {loading && (
            <p className="text-sm text-gray-500 mt-2">
              Uploading and compressing the image please wait...
            </p>
          )}
          {err && (
            <p className="text-sm text-red-500 mt-2">
              Something went wrong, {error}
            </p>
          )}
        </form>
        <p>Or log in with google</p>
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
        <p className="text-sm">
          You do have an account?{" "}
          <span className="cursor-pointer underline">
            <Link to="/Login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
