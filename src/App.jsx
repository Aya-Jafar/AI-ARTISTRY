import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect, createPortal } from "react";
import Nav from "./components/home/cover-section/Nav";
import { AlertProvider } from "./providers/Alert";
import AuthPopupContext from "./providers/AuthPopup";

// Lazy load the pages
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Imagine = lazy(() => import("./pages/Imagine"));
const ArtworkDetail = lazy(() => import("./pages/ArtWorkDetails"));
const MoreArtworks = lazy(() => import("./pages/MoreArtworks"));
const Popup = lazy(() => import("./components/home/cover-section/Popup"));

/**
 * @component App
 * @description
 * The main entry point for the application. It contains the routing logic and renders the appropriate components
 * based on the current URL path.
 */

function App() {
  const { loginPopup, signupPopup } = useContext(AuthPopupContext);

  useEffect(() => {
    console.log(loginPopup);
  }, [loginPopup]);

  return (
    <>
      <Nav />

      {/* Login Modal rendered above all routes */}
      {loginPopup && (
        <Suspense fallback={<span class="loader"></span>}>
          <Popup type="login" />
        </Suspense>
      )}
      {/* Signup Modal rendered above all routes */}
      {signupPopup && (
        <Suspense fallback={<span class="loader"></span>}>
          <Popup type="signup" />
        </Suspense>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<span class="loader"></span>}>
              <Home />
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
