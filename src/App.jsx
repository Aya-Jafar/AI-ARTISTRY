import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Nav from "./components/home/cover-section/Nav";
import { AlertProvider } from "./providers/Alert";

// Lazy load the pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Imagine = lazy(() => import("./pages/Imagine"));
const ArtworkDetail = lazy(() => import("./pages/ArtWorkDetails"));
const MoreArtworks = lazy(() => import("./pages/MoreArtworks"));

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

      {/* Conditionally show Home page */}
      {showHomePage && (
        <Suspense fallback={<span class="loader"></span>}>
          <Home />
        </Suspense>
      )}

      <Routes>
        {/* Using Suspense with lazy-loaded components */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/signup"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <SignUp />
            </Suspense>
          }
        />

        <Route
          path="/imagine"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <AlertProvider>
                <Imagine />
              </AlertProvider>
            </Suspense>
          }
        />

        <Route
          path="/profile/:uid"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="/artwork/:id"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <AlertProvider>
                <ArtworkDetail />
              </AlertProvider>
            </Suspense>
          }
        />

        <Route
          path="/artwork/generated/:generatedImageUrl"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <AlertProvider>
                <ArtworkDetail
                  isGeneratedArtwork={true}
                  label="saved-generated"
                />
              </AlertProvider>
            </Suspense>
          }
        />

        <Route
          path="/post/:postUrl"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <AlertProvider>
                <ArtworkDetail isGeneratedArtwork={true} label="posts" />
              </AlertProvider>
            </Suspense>
          }
        />

        <Route
          path="/artworks/more/"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <MoreArtworks />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
