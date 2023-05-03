import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ChatContextProvider } from "./context/ChatContext";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <App />
          <ToastContainer />
        </React.StrictMode>
      </ChatContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
);
