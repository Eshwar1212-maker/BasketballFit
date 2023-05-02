import { CreatePost } from "../forum/CreatePost"

const Forum = () => {
  return (
    <div>
        <div className=" mt-[100px] flex justify-center items-center w-[89%] md:w-[60%] h-full border-2 border-s border-[#b7b7b7] m-auto rounded-xl">
          <CreatePost />
        </div>
    </div>
  )
}

export default Forum