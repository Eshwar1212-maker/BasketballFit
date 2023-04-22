import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AiOutlineSearch } from "react-icons/ai";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Add doc, getDoc, and setDoc to the imports
import { serverTimestamp } from "@firebase/firestore";

interface User {
  user: null;
  photoURL: string;
  displayName: string;
  uid: any;
}

export const Search = () => {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    if (!currentUser || !currentUser.uid || !user || !user.uid) {
      // If either currentUser or user is undefined or their uid is undefined, return early
      return;
    }
    const combinedId =
      (currentUser?.uid ?? "") > (user?.uid ?? "")
        ? (currentUser?.uid ?? "") + (user?.uid ?? "")
        : (user?.uid ?? "") + (currentUser?.uid ?? "");

    console.log("combinedId:", combinedId);

    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const res = await getDoc(chatDocRef);

      if (!res.exists()) {
        console.log("Chat document doesn't exist, creating...");

        await setDoc(chatDocRef, { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId + ".userInfo"]: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user?.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log("Chat document created");
      } else {
        console.log("Chat document already exists");
      }
    } catch (err) {
      console.error("Error in handleSelect:", err);
    }

    //setUser(undefined);
    setUserName("");
  };

  return (
    <div>
      <div className="flex flex-row p-1 cursor-pointer">
        <input
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          className="rounded-xl w-[90%] text-black bg-white border-none"
          placeholder="Find a user"
          value={username}
        />
        <AiOutlineSearch className="w-[10%]" size={45} />
      </div>
      {error && <span>Something went wrong</span>}
      {user && (
        <button onClick={handleSelect}>
          <div className="flex px-5 bg-slate-600 w-[900px] text-white rounded-xl hover:bg-slate-500 cursor-pointer gap-12 hover:w-[900px]">
            <img
              className="hidden md:block md:w-[56px] h-[56px] rounded-full"
              src={user?.photoURL}
            />
            <div className="flex flex-col justify-center">
              <p>{user.displayName}</p>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
