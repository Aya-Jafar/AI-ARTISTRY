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

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import db from "../backend/firebaseConfig";
import { app } from "../backend/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // console.log(currentUser && currentUser.accessToken);
  //  console.log(currentUser && currentUser.getIdToken());

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("token", user.accessToken);
      }
      // console.log(user);
    });

    return unsubscribe;
  }, [auth]);

  // console.log(localStorage.getItem("token"));

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user document already exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // User doesn't exist, create a new user document
        await setDoc(doc(db, "users", user.uid), {
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

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Check if the user document already exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // User doesn't exist, create a new user document
        await setDoc(doc(db, "users", user.uid), {
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

  const signUpWithEmailAndPassword = async (email, displayName, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, { displayName: displayName });
    } catch (error) {
      console.error("Email sign-up error:", error);
    }
  };

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
