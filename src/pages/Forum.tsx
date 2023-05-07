import { CreatePost } from "../components/forum/CreatePost"
import { NewsWidget } from "../components/forum/NewsWidget"

const Forum = () => {
  return (
    <div>
        <div className=" mt-[100px] flex justify-center items-center w-[89%] md:w-[40%] h-full m-auto rounded-xl">
          <div className="hidden 2xl:block">
          <NewsWidget />

          </div>
          <CreatePost />
        </div>
    </div>
  )
}

export default Forum