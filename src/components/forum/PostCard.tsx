import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LikeButton } from "./LikeButton";

interface Post {
  post: any;
  date?: any;
  id?: string
}

export const PostCard = ({ post, id }: Post) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col md:flex md:items-center md:flex-row">
      <p className="flex-1 text-center">{post.status}</p>
      <div>
        <p className="text-sm underline ml-auto">{post.timeStamp}</p>
        <p>-{post.name}</p>
        <LikeButton
         postsId = {post.id}
         userId={currentUser?.uid}/>
      </div>
    </div>
  );
};
