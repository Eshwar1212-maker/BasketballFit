import { db } from "../firebase"
import { Timestamp, doc, query, setDoc, where } from "firebase/firestore"
import {addDoc, collection, onSnapshot} from 'firebase/firestore'
import {toast} from 'react-toastify'
import { getCurrentTimeStamp } from "../utils/useMoment"
let dbRef = collection(db, 'posts')
let likesRef = collection(db, "likes")

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

export const likePost = (userId: string | undefined, postId: string | undefined) => {
  try{
    let doctoLike = doc(likesRef, `${userId}_${postId}`) 
    setDoc(doctoLike, {userId, postId})
  }catch(err){
    console.log(err);
  }
}

export const getLikesByUser = (userId: string | undefined , postId: string | undefined, setLiked: any, setLikesCount: any) => {
    try{
      let likeQuery = query(likesRef, where('postId', "==", postId))
      onSnapshot(likeQuery, (response) => {
        let likes = response.docs.map((doc) => doc.data())
        console.log(likes);
        let likesCount = likes.length
        const isLiked = likes.some((like) => like.id === userId)
        setLikesCount(likesCount)
        setLiked(isLiked)

      })
    }catch(err){
      console.log(err);
    }
}