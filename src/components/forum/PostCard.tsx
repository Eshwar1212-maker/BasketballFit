import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LikeButton } from "./LikeButton";
import { AiFillLike, AiFillDelete } from 'react-icons/ai';
import { deletePost } from "../../context/FireStoreApi";


interface PostCardProps {
  post: any;
  id?: string;
  isComment?: boolean; // Add this prop to indicate whether this is a comment or not
}

export const PostCard = ({ post, id}: PostCardProps) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center">
      <div className="py-1 w-full text-sm">
        <div className="text-right flex justify-between">
          <div>
            <img className="rounded-full h-[76px] w-[76px]" src={post.photoURL} />
          </div>
          <div>
            <p className="text-[17px]">-{post.name}</p>
            <p className="text-[12px] underline">{post.timeStamp}</p>
          </div>
        </div>
        <div className="flex justify-center items-start mb-9">
          <p className="text-lg text-center">{post.status}</p>
        </div>
      </div>

      <div>
        <LikeButton
          postsId={post.id}
          userId={currentUser?.uid}
          currentUser={currentUser}
        />
      </div>

      {/* Only show the delete button if this is a post and currentUser matches post.userID */}
      {currentUser?.uid === post.userID && (
        <button onClick={() => deletePost(post.id)} className="ml-[690px]">
          <AiFillDelete size={30} />
        </button>
      )}
    </div>
  );
};
