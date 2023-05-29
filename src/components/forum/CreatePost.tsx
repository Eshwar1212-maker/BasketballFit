import { useContext, useState, useEffect } from 'react';
import { Backdrop } from '../Backdrop';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
import { PostStatus } from '../../utils/FireStoreApi';
import { PostCard } from './PostCard';
import { getPosts } from '../../utils/FireStoreApi';
import { getCurrentTimeStamp } from '../../utils/useMoment';
import { getUniqueId } from '../../utils/useMoment';
import { ThemeContext } from '../../context/ThemeContext';


export const CreatePost = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const {theme} = useContext(ThemeContext)
    const [inputStatus, setInputStatus] = useState('');
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const {currentUser} = useContext(AuthContext);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        let object = {
            status: inputStatus,
            timeStamp: getCurrentTimeStamp('LLL'),
            name: currentUser?.displayName,
            postID: getUniqueId(),
            userID: currentUser?.uid,
            photoURL: currentUser?.photoURL
        };
        PostStatus(inputStatus, object);
        setModalOpen(!modalOpen);
        setInputStatus('');
    };

    useEffect(() => {
        getPosts(setAllPosts); // Pass setLoading to getPosts
        console.log(allPosts[0]);
        
    }, []);
    return (
        <div className="flex flex-col text-center">
            <div className=' rounded-full'>
                <button
                    onClick={() => setModalOpen(!modalOpen)}
                    className=
                    {theme === "lightMode" ?
                 "w-[300px] md:w-[800px] h-[40px] text-left rounded-3xl cursor-pointer p-5 items-center m-3 pb-9 border-2 border-black"
                 : 
                 "w-[300px] md:w-[800px] h-[40px] text-left rounded-3xl cursor-pointer p-5 items-center m-3 pb-9 border-2 border-white"

                }
                >
                    Start a conversation...
                </button>
                {modalOpen && (
                    <Backdrop>
                        <div
                            className="m-auto pb-0 pl-[2rem] flex flex-col items-center line-clamp-3 z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col w-[360px] md:w-[700px] p-10 rounded-xl gap-3 text-xl text-center font-bold bg-white text-black"
                            >
                                <div className="flex justify-between">
                                    <div className="flex justify-end cursor-pointer">
                                        <AiFillCloseCircle
                                            onClick={() => setModalOpen(!modalOpen)}
                                            size={34}
                                        />
                                    </div>
                                </div>
                                <textarea
                                    onChange={(e) => setInputStatus(e.target.value)}
                                    className="rounded-[60px] text-center border-2 border-black items-center h-[139px] py-11"
                                    placeholder="What do you want to talk about"
                                />
                                <button
                                    type="submit"
                                    className={
                                        inputStatus.length > 0
                                            ? "p-3 rounded-[40px] bg-slate-600 hover:bg-slate-400 text-white"
                                            : "p-3 rounded-[40px] bg-slate-200 text-gray-400"
                                    }
                                >
                                    Start
                                </button>
                            </form>
                        </div>
                    </Backdrop>
                )}
            </div>
            <div className="">
                {allPosts.map((post) => {
                    return (
                        <div key={post.id} className={theme === "lightMode" ?
                         "border-[1px] border-black rounded-md p-6 cursor-pointer m-11 max-h-[330px] h-fit overflow-y-scroll"
                         : "border-white border-[1px] rounded-md p-6 cursor-pointer m-11 max-h-[330px] h-fit overflow-y-scroll"

                        }
                         >
                            <PostCard id={post.id} key={post.id} post={post}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}      