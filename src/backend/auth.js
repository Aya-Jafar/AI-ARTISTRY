



export const isAuthenticated = (currentUser) => {
  return currentUser ? true : false;
};


export const handleSignIn = async (
  logInWithEmailAndPassword,
  email,
  password,
  setErrorMessage
) => {
  try {
    await logInWithEmailAndPassword(email, password, setErrorMessage);
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
