import { BiLike } from 'react-icons/bi';
import { likePost } from '../../utils/FireStoreApi';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getLikesByUser } from '../../utils/FireStoreApi';
import { AiFillLike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import { postComment } from '../../utils/FireStoreApi';
import { getCurrentTimeStamp } from '../../utils/useMoment';
import { getComments } from '../../utils/FireStoreApi';

interface LikeButton {
  userId: string | undefined;
  postsId: string | undefined;
  currentUser: any | undefined
}

export const LikeButton = ({ userId, postsId, currentUser }: LikeButton) => {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const lastCommentRef = useRef<HTMLDivElement>(null);


  const handleLike = () => {
    likePost(userId, postsId, liked);
    console.log(likesCount);
  };

  const getComment = (e: any) => {
    setComment(e.target.value);
  };

  const addComment = () => {
    postComment(postsId, comment, getCurrentTimeStamp('LLL'), '');
    setComment('');
  };

  useMemo(() => {
    getLikesByUser(userId, postsId, setLiked, setLikesCount);
    getComments(postsId, setComments);
  }, [userId, postsId]);

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);


  return (
    <div className="">
      <div className="flex items-center justify-between gap-7">
        <div className="flex items-center gap-2">
          {liked ? (
            <>
              <AiFillLike onClick={handleLike} size={23} /> {likesCount}
            </>
          ) : (
            <>
              <BiLike onClick={handleLike} size={23} /> {likesCount}
            </>
          )}
        </div>
        <div onClick={() => setShowCommentBox(!showCommentBox)} className="flex items-center gap-2 cursor-pointer">
          <FaComments onClick={() => setShowCommentBox(!showCommentBox)} size={28} />
          <p className="text-sm">{comments.length} {comments.length === 1 ? <>Comment</> : <>Comments</>}</p>
        </div>
      </div>
      {!showCommentBox && (
        <>
          <div className="mt-2 flex w-[490px] m-auto">
            <input
              className="w-full rounded-lg bg-gray-200 p-2 px-8 h-11 text-center"
              placeholder="Your thoughts?..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
            />
            <button
              onClick={addComment}
              className="p-3 bg-slate-600 rounded-md text-white h-11"
            >
              Post
            </button>
          </div>
          {comments.length > 0 ? (
            comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="border-b-2 mt-4 flex justify-between"
                >
                  <p className="text-[14px]">{comment.comment}</p>
                  <p className="text-[10px]">{comment.timeStamp}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}

        </>
      )}
    </div>
  );
};
