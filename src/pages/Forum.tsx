import { CreatePost } from "../components/forum/CreatePost"

const Forum = () => {
  return (
    <div>
        <div className=" mt-[100px] flex justify-center items-center w-[89%] md:w-[60%] h-full m-auto rounded-xl">
          <CreatePost />
        </div>
    </div>
  )
}

export default Forum