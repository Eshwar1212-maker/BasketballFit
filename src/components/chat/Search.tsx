import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BiSearchAlt2 } from 'react-icons/bi';
import { collection, getDocs, query, serverTimestamp, updateDoc, where, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { doc } from 'firebase/firestore';

interface UserData {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

export const Search = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const [usernme, setUserName] = useState('');
  const [user, setUser] = useState<UserData | null>(null);
  const [err, setErr] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    const q = query(collection(db, 'users'), where('displayName', '==', usernme));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        setUser(doc.data() as UserData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') {
      handleSearch();
    }
  };
  const handleSelect = async (): Promise<void> => {
    const combinedId =
      currentUser?.uid && user?.uid
        ? currentUser?.uid + user.uid + currentUser.uid
        : '';
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), {messages: []});
        await updateDoc(doc(db, "userChats", currentUser?.uid || ""), {
          [combinedId + ".userInfo"]: {
            uid: user?.uid ?? '',
            displayName: user?.displayName ?? '',
            photoURL: user?.photoURL ?? ''
          },
          [combinedId+".date"]: serverTimestamp()
        });
        
        await updateDoc(doc(db, "userChats", user?.uid || ""), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid ?? '',
            displayName: currentUser?.displayName ?? '',
            photoURL: currentUser?.photoURL ?? ''
          },
          [combinedId+".date"]: serverTimestamp()
        });
        
      }
    } catch (err) {
      console.log(err);
    }
    setUserName('')
  };

  return (
    <div>
      <div className='flex h-[2rem] border-b'>
        <input
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Search users...'
          className=' text-black rounded-md w-full text-xl'
        />
      </div>
      {user && (
        <div 
        onClick={handleSelect} className='flex px-4 border-b justify-between hover:bg-slate-900 cursor-pointer'>
          <img
            className='w-[47px] h-[47px] rounded-full my-2'
            src={user?.photoURL ?? ''}
          />
          <span className='py-4 mx-6 underline text-xl'>
            {user?.displayName}
          </span>
        </div>
      )}
      {err && <p>User not found</p>}
    </div>
  );
};
