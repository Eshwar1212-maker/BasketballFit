// AuthenticatedApp.tsx
import React, { useContext } from "react";
import { Route, Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";


const AuthenticatedApp: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <Route path="/" element={<Outlet />} />
    </div>
  );
};

export default AuthenticatedApp;
