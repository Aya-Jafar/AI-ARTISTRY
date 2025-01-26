import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import db from "../backend/firebaseConfig";
import { app } from "../backend/firebaseConfig";
import { FIREBASE_USERS_COLLECTION } from "../utils/constants";

/**
 * @description
 * This context provides authentication methods and user data management,
 * supporting sign-in through Google, Facebook, and email, as well as user
 * profile management in Firestore.
 */
const AuthContext = createContext();

/**
 * @description
 * AuthProvider component manages user authentication, including sign-in,
 * sign-up, and sign-out operations. It handles state persistence for the
 * current user and stores the user's token in localStorage.
 * - The context is provided to child components for easy access to the current
 *   user and authentication functions.
 * @component
 * @returns {JSX.Element} The context provider wrapping children components.
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(app);

  /**
   * @effect
   * @description
   * Subscribes to Firebase's auth state changes to automatically manage
   * the current user state. If the user is logged in, their access token is
   * saved to localStorage.
   * @dependencies [auth]
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("token", user.accessToken);
      }
    });

    return unsubscribe;
  }, [auth]);

  /**
   * @function signInWithGoogle
   * @description
   * Handles user sign-in via Google using Firebase Authentication.
   * - If the user doesn't exist in Firestore, a new document is created.
   * @returns {Promise<void>} A promise that resolves when the sign-in is complete.
   */
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user document already exists
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // User doesn't exist, create a new user document
        await setDoc(doc(db, FIREBASE_USERS_COLLECTION, user.uid), {
          name: user.displayName,
          email: user.email,
          image: user.reloadUserInfo.photoUrl,
          timestamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  /**
   * @function signInWithFacebook
   * @description
   * Handles user sign-in via Facebook using Firebase Authentication.
   * - If the user doesn't exist in Firestore, a new document is created.
   * @returns {Promise<void>} A promise that resolves when the sign-in is complete.
   */
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Check if the user document already exists
      const docRef = doc(db, FIREBASE_USERS_COLLECTION, user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // User doesn't exist, create a new user document
        await setDoc(doc(db, FIREBASE_USERS_COLLECTION, user.uid), {
          name: user.displayName,
          email: user.email,
          image: user.reloadUserInfo.photoUrl,
          timestamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Facebook sign-in error:", error);
    }
  };

  /**
   * @function signUpWithEmailAndPassword
   * @description
   * Signs up a user with an email and password. It also updates the user's
   * display name after successful sign-up.
   * @param {string} email - The email address for the new user.
   * @param {string} displayName - The display name for the new user.
   * @param {string} password - The password for the new user.
   * @returns {Promise<void>} A promise that resolves after sign-up.
   */
  const signUpWithEmailAndPassword = async (email, displayName, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: displayName });
    } catch (error) {
      console.error("Email sign-up error:", error);
    }
  };

  /**
   * @function logInWithEmailAndPassword
   * @description
   * Logs in a user with an email and password.
   * - Sets an error message if the login fails.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @param {function} setErrorMessage - A function to set the error message.
   * @returns {Promise<void>} A promise that resolves after login.
   */
  const logInWithEmailAndPassword = async (
    email,
    password,
    setErrorMessage
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage(error.message.split("/")[1]);
      // console.error(error.message.split("/")[1]);
    }
  };

  /**
   * @function signOutUser
   * @description
   * Signs out the current user and removes the token from localStorage.
   * @returns {Promise<void>} A promise that resolves after sign-out.
   */
  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signInWithGoogle,
        signInWithFacebook,
        signUpWithEmailAndPassword,
        logInWithEmailAndPassword,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
