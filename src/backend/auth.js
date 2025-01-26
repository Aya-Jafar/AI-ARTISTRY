/**
 * @function isAuthenticated
 * @description
 * Checks if the user is authenticated by verifying if the `currentUser` exists.
 * @param {Object} currentUser - The user object, typically coming from the authentication state.
 * @returns {boolean} Returns true if the user is authenticated, false otherwise.
 */
export const isAuthenticated = (currentUser) => {
  return currentUser && currentUser !== null ? true : false;
};

/**
 * @function handleSignIn
 * @description
 * Handles the sign-in process by calling the provided `logInWithEmailAndPassword` function. It attempts to log the user in with the provided email and password.
 * @param {Function} logInWithEmailAndPassword - The function responsible for logging in the user with email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {Function} setErrorMessage - A function used to update the error message state.
 */
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

/**
 * @function handleSignUp
 * @description
 * Handles the sign-up process by calling the provided `signUpWithEmailAndPassword` function. It attempts to create a new user with the provided email, display name, and password.
 * @param {Function} signUpWithEmailAndPassword - The function responsible for signing up the user with email, display name, and password.
 * @param {string} email - The user's email address.
 * @param {string} displayName - The user's display name.
 * @param {string} password - The user's password.
 */
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
