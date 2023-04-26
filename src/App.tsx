import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ChatPage } from "./pages/Chat/ChatPage";
import { Gyms } from "./pages/Gyms/Gyms";
import { Workouts } from "./pages/Workouts/Workouts";
import { Home } from "./pages/Home";
import { ChatRooms } from "./pages/Chat/ChatRooms";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import Register from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";



function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
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
          </>
        )}

        <Route path="/workouts" element={<Workouts />} />
        <Route path="/gyms" element={<Gyms />} />
      </Routes>
    </Router>
  );
}

export default App;
