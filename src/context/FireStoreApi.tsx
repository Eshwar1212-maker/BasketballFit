import { db } from "../firebase"
import { Timestamp } from "firebase/firestore"
import {addDoc, collection, onSnapshot} from 'firebase/firestore'
import {toast} from 'react-toastify'
import { getCurrentTimeStamp } from "../utils/useMoment"



let dbRef = collection(db, 'posts')
export const PostStatus = (status: string, object: any) => {
  
    addDoc(dbRef, object)
      .then(() => {
        toast.success("Post has been added succesfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  export const getPosts = (setallPosts: any) => {
      onSnapshot(dbRef, (response) => {
        setallPosts(response.docs.map((docs) => {
          return {...docs.data(), id: docs.id}
        }));
      })
  } 