import React, { useContext } from "react";
import AuthContext from "../providers/Auth";

// const {
//     signInWithGoogle,
//     signInWithFacebook,
//     setCurrentUser,
//     signInWithEmailAndPassword,
//   } = useContext(AuthContext);

export const handleSignIn = async (logInWithEmailAndPassword , email, password) => {

  try {
    await logInWithEmailAndPassword(email, password);
    // Handle successful sign-up, e.g., redirect the user to a different page
  } catch (error) {
    console.error("Email sign-up error:", error);
    // Handle sign-up error, e.g., display an error message to the user
  }
};



export const handleSignUp = async (
  signUpWithEmailAndPassword,
  email,
  displayName,
  password
) => {
  try {
    await signUpWithEmailAndPassword(email, displayName, password);
    // Handle successful sign-up, e.g., redirect the user to a different page
  } catch (error) {
    console.error("Email sign-up error:", error);
  }
};
