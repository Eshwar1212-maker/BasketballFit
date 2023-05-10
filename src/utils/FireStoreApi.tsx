import { db } from "../firebase"
import { Timestamp, deleteDoc, doc, orderBy, query, setDoc, where } from "firebase/firestore"
import {addDoc, collection, onSnapshot} from 'firebase/firestore'
import {toast} from 'react-toastify'
import { getCurrentTimeStamp } from "./useMoment"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"



let dbRef = collection(db, 'posts')
let likesRef = collection(db, "likes")
let commentsRef = collection(db, "comments")
let postsRef = collection(db, "posts");


export const useAuthContext = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser;
};
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
    const orderedQuery = query(dbRef, orderBy("timeStamp", "asc"));
    onSnapshot(orderedQuery, (response) => {
      setallPosts(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    
};

export const likePost = (userId: string | undefined, postId: string | undefined, liked: any) => {
  try{
    let doctoLike = doc(likesRef, `${userId}_${postId}`) 
    if(liked){
        deleteDoc(doctoLike)
    }else {
      setDoc(doctoLike, {userId, postId})

    }
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
        const isLiked = likes.some((like) => like.userId === userId)
        setLikesCount(likesCount)
        setLiked(isLiked)

      })
    }catch(err){
      console.log(err);
    }
}

export const postComment = (postId: string | undefined, comment: string, timeStamp: string, name: any) => {
  try{
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name
    })

  }catch(error){
    console.log(error);
    
  }
}

export const getComments = (postId: string | undefined, setComments: any) => {
  try{
    let singlePostQuery = query(commentsRef, where("postId", "==", postId))
    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      setComments(comments)
    })
    
  }catch(err){
    console.log(err);
    
  }
}

export const deletePost = (id: string) => {
  let docToDelete = doc(postsRef, id)
  try{
    deleteDoc(docToDelete)
  }
  catch(error){
    console.log(error);
    
  }

}