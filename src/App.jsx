import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { useState } from "react";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import Dream from "./pages/Dream";

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);

  const location = useLocation();

  // Check if the current route is not the Dream page and not the profile page
  const showHomePage =
    location.pathname !== "/dream" && location.pathname !== "/profile";

  return (
    <>
      <Nav
        loginPopup={loginPopup}
        setLoginPopup={setLoginPopup}
        signupPopup={signupPopup}
        setSignupPopup={setSignupPopup}
      />

      {showHomePage && (
        <Home
          loginPopup={loginPopup}
          setLoginPopup={setLoginPopup}
          signupPopup={signupPopup}
          setSignupPopup={setSignupPopup}
        />
      )}

      <Routes>
        <Route to="/" element={<Dream />} />

        <Route
          path="/login"
          element={
            <Login loginPopup={loginPopup} setLoginPopup={setLoginPopup} />
          }
        />

        <Route
          path="/signup"
          element={
            <SignUp signupPopup={signupPopup} setSignupPopup={setSignupPopup} />
          }
        />

        <Route path="/dream" element={<Dream />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
