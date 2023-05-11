import { CreatePost } from "../components/forum/CreatePost"
import { NewsWidget } from "../components/forum/NewsWidget"

const Forum = () => {
  return (
    <div>
        <div className=" mt-[100px] md:flex justify-center items-center w-[89%] md:w-[40%] h-full m-auto rounded-xl">
          <div className="hidden 2xl:block p-9">
          <NewsWidget />
          </div>
          <CreatePost />
        </div>
    </div>
  )
}

export default Forum