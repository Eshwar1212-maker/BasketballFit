import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import background from "../../assets/background.mp4";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../../firebase";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type Error = {
  error: string;
};

const Register = () => {
  const [err, setErr] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const fileInput = e.target[3];
    const file =
      fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;

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

              navigate("/workouts");
            } catch (err) {
              console.log(err);
              setError((err as Error).message);
              setErr(true);
              setLoading(false);
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

  return (
    <div className=" text-white relative h-screen my-[30px]">
      <video
        className="w-full h-full object-cover"
        src={background}
        autoPlay
        loop
        muted
      />
      <div className="bg-blue-50 flex items-center flex-col py-[120px] absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center cursor-pointer">
        <span className="text-3xl font-bold block mb-4">
          Create an account!
        </span>

        <form onSubmit={handleSubmit} className="space-y-1">
          <h2 className="flex start">Username:</h2>
          <input
            required
            type="text"
            placeholder="display name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
          />
          <h2 className="flex start">Email:</h2>
          <input
            required
            type="email"
            placeholder="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
          />
          <h2 className="flex start">Password:</h2>
          <input
            required
            type="password"
            placeholder="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
          />
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
          />
          <label htmlFor="file" className="cursor-pointer">
            <img src="" alt="" />
            <span className="text-white hover:text-indigo-300 text-lg underline">
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
          <span className="w-[220px] relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 w-[400px] bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative text-xl">
              <FcGoogle className="m-auto" size={40} />
            </span>
          </span>
        </a>
        <p className="text-lg mt-4">
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
