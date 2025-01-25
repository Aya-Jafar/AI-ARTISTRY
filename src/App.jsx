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

/**
 * @component App
 * @description
 * The main entry point for the application. It contains the routing logic and renders the appropriate components
 * based on the current URL path. It also conditionally renders the `Home` page when the user is on certain routes.
 */

function App() {
  const location = useLocation();

  // Check if the current route is not the Imagine page and not the profile page
  const showHomePage =
    location.pathname !== "/imagine" &&
    !location.pathname.startsWith("/profile") &&
    !location.pathname.startsWith("/artwork/") &&
    !location.pathname.startsWith("/post/") &&
    location.pathname !== "/artworks/more/";

  return (
    <>
      <Nav />
      {showHomePage && <Home />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/imagine"
          element={
            <AlertProvider>
              <Imagine />
            </AlertProvider>
          }
        />
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
          path="/artwork/generated/:generatedImageUrl"
          element={
            <AlertProvider>
              <ArtworkDetail
                isGeneratedArtwork={true}
                label="saved-generated"
              />
            </AlertProvider>
          }
        />

        <Route
          path="/post/:postUrl"
          element={
            <AlertProvider>
              <ArtworkDetail isGeneratedArtwork={true} label="posts" />
            </AlertProvider>
          }
        />

        <Route path="/artworks/more/" element={<MoreArtworks />} />
      </Routes>
    </>
  );
}

export default App;
