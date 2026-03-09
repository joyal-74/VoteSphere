import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "../pages/Home";
import EntryLobby from "../pages/Lobby";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ChatLayout from "../components/ChatLayout";
import { WelcomePageWrapper } from "../components/WelcomePageWrapper";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/lobby", element: <ProtectedRoute><EntryLobby /></ProtectedRoute> },
  {
    path: "/rooms",
    element: <ProtectedRoute><ChatLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <WelcomePageWrapper /> },
      { path: ":roomId", element: <ChatPage /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);