import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LazyLoader from "./components/LazyLoader";

const Home = lazy(() => import("./pages/Home"));
const ChatPage = lazy(() => import("./pages/Chat/ChatPage"));
const Gyms = lazy(() => import("./pages/Gyms/Gyms"));
const Workouts = lazy(() =>
  new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => resolve(import("./pages/Workouts/Workouts")),2000 );
  })
);

const ChatRooms = lazy(() => import("./pages/Chat/ChatRooms"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
const Register = lazy(() => import("./pages/auth/Register"));
const UsersWorkouts = lazy(() =>
  new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => resolve(import("./pages/Workouts/UsersWorkouts")),2000 );
  })
);

const Login = lazy(() => import("./pages/auth/Login"));

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LazyLoader />}>
        <Routes>
          {!currentUser && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />}></Route>
            </>
          )}

          {currentUser && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/ChatPage" element={<ChatPage />} />
              <Route path="/ChatRooms" element={<ChatRooms />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/UsersWorkouts" element={<UsersWorkouts />} />
            </>
          )}

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
