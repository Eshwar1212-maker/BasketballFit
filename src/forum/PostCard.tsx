import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Post {
  post: any;
  date?: any;
}

export const PostCard = ({ post }: Post) => {
  console.log(post);

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col md:flex md:items-center md:flex-row">
      <p className="flex-1 text-center">{post.status}</p>
      <div>
        <p className="text-sm underline ml-auto">{post.timeStamp}</p>
        <p>-{post.name}</p>
      </div>
    </div>
  );
};
