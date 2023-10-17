import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Nav from "./components/home/cover-section/Nav";
import Imagine from "./pages/Imagine";
import ArtworkDetail from "./pages/ArtWorkDetails";
import MoreArtworks from "./pages/MoreArtworks";
import { AlertProvider } from "./providers/Alert";

function App() {
  const location = useLocation();

  // // Check if the current route is not the Imagine page and not the profile page
  const showHomePage =
    location.pathname !== "/imagine" &&
    !location.pathname.startsWith("/profile") &&
    !location.pathname.startsWith("/artwork/") &&
    location.pathname !== "/artworks/more/";

  return (
    <>
      <Nav />
      {showHomePage && <Home />}

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/imagine" element={<Imagine />} />
        <Route path="/profile/:uid" element={<Profile />} />

        <Route
          path="/artwork/:id"
          element={
            <AlertProvider>
              <ArtworkDetail />
            </AlertProvider>
          }
        />

        <Route
          // strict
          path="/artwork/generated/:generatedImageUrl"
          element={
            <ArtworkDetail isGeneratedArtwork={true} label="saved-generated" />
          }
        />

        <Route
          // strict
          path="/post/:postUrl"
          element={<ArtworkDetail isGeneratedArtwork={true} label="posts" />}
        />

        <Route path="/artworks/more/" element={<MoreArtworks />} />
      </Routes>
    </>
  );
}

export default App;
