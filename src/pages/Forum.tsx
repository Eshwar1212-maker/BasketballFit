import { CreatePost } from "../components/forum/CreatePost"

const Forum = () => {
  return (
    <div>
        <div className=" mt-[100px] md:flex justify-center items-center w-[89%] md:w-[40%] h-full m-auto rounded-xl">
          <div className="hidden 2xl:block p-9">
          </div>
          <CreatePost />
        </div>
    </div>
  )
}

export default Forum