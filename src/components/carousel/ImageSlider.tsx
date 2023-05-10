import { useState } from "react"
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"

const ImageSlider = ({slides, onHide}: any) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrev = () => {
      const isFirstSlide = currentIndex === 0
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
    }
    const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1
      const newIndex = isLastSlide ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
    }

  return (
    <div className="flex items-center justify-center mx-auto text-center py-[300px] bg-white h-[400px] w-[700px] md:h-[700px] md:w-[1000px] rounded-md">  
      <div className="flex mx-auto py-[300px] justify-between">  
        <div className="fixed left-0 bottom-0">
          <p onClick={goToPrev}><AiFillLeftCircle size={30}/></p>
        </div>
        <div>
          {[slides[currentIndex]]}
        </div>
        <div className="fixed right-0 bottom-0">
          <p onClick={goToNext}><AiFillRightCircle size={30}/></p>
        </div>
        <button onClick={onHide} className="fixed top-6 text-4xl text-black right-8">X</button>
      </div>  
    </div>
  )
}

export default ImageSlider
