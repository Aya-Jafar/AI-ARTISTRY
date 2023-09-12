import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { useState, useContext } from "react";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import Imagine from "./pages/Imagine";
import ArtworkDetail from "./pages/ArtWorkDetails";

function App() {
  const location = useLocation();

  // Check if the current route is not the Imagine page and not the profile page
  const showHomePage =
    location.pathname !== "/imagine" &&
    location.pathname !== "/profile" &&
    !location.pathname.startsWith("/artwork/");

  return (
    <>
      <Nav />

      {showHomePage && <Home />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/imagine" element={<Imagine />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </>
  );
}

export default App;
