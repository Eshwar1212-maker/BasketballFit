import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import LazyLoader from "./components/LazyLoader";
import { ThemeContext } from "./context/ThemeContext";
import { Index } from "./components/carousel";


const Home = lazy(() => import("./pages/Home"));
const Gyms = lazy(() => import("./pages/Gyms/Gyms"));
const Workouts = lazy(() =>
  new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => resolve(import("./pages/Workouts/Workouts")), 1000);
  })
);
const SkillWorkouts = lazy(() => import("./pages/SkillWorkouts"))
const MonthlyWorkouts = lazy(() => import("./components/MonthlyWorkouts"));
const ChatRooms = lazy(() => import("./pages/Chat/ChatRooms"));
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage"));
const Register = lazy(() => import("./pages/auth/Register"));
const UsersWorkouts = lazy(() =>
  new Promise<{ default: React.ComponentType }>((resolve) => {
    setTimeout(() => resolve(import("./pages/Workouts/UsersWorkouts")), 1000);
  })
);
const Forum = lazy(() => import("./pages/Forum"));


const Login = lazy(() => import("./pages/auth/Login"));

function App() {
  const { currentUser } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "lightMode" ? "darkMode" : "lightMode";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
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
                  <Route path="/ChatRooms" element={<ChatRooms />} />
                  <Route path="/ProfilePage" element={<ProfilePage />} />
                  <Route path="/UsersWorkouts" element={<UsersWorkouts />} />
                  <Route path="/Forum" element={<Forum />} />
                  <Route path="/MonthlyWorkouts" element={<MonthlyWorkouts />} />
                  <Route path="/skills" element={<SkillWorkouts />} />
                  <Route path="/slider" element={<Index />} />
                </>
              )}
            </Routes>
          </Suspense>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
