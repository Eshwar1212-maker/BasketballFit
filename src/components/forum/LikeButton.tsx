import { BiLike} from 'react-icons/bi'
import { likePost } from '../../context/FireStoreApi'
import { useEffect, useMemo, useState } from 'react'
import { getLikesByUser } from '../../context/FireStoreApi'


interface LikeButton{
  userId: string | undefined,
  postsId: string | undefined
}


export const LikeButton = ({userId, postsId}: LikeButton) => {
  const [likesCount, setLikesCount] = useState(0)
  const [liked, setLiked] = useState(false)
  console.log(likesCount);


  const handleLike = () => {
    likePost(userId, postsId)
    console.log(likesCount);

  }
  useMemo(() =>{
     getLikesByUser(userId,postsId,  setLiked, setLikesCount)
    }, [userId, postsId])

  return (
    <div 
    onClick={handleLike}
    className='flex cursor-pointer'>
      <BiLike size={23}/>
      {likesCount} 
      <p> </p>
    </div>
  )
}
