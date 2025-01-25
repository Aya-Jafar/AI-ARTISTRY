import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../../providers/Auth";
import { handleSignUp } from "../../../backend/auth";
import CloseButton from "./CloseButton";
import AuthBtn from "./AuthBtn";
import SignUpForm from "./SignUpForm";
import AuthPopupContext from "../../../providers/AuthPopup";

/**
 * @component
 * @description
 * The `SignUpContent` component handles the sign-up process and displays a set of buttons for different sign-up methods.
 * - It offers users the option to sign up via Google, Facebook, or email.
 * - The email option, when clicked, switches to a sign-up form for email-based registration.
 * - It integrates with the `AuthContext` to manage authentication flows (Google, Facebook, and email sign-ups).
 * - If the user chooses to sign up via email, the `SignUpForm` component is displayed.
 *
 * @example
 * <SignUpContent />
 *
 */
function SignUpContent() {
  /**
   * @description
   * Context hooks to manage authentication functions and current user state.
   */
  const {
    signInWithGoogle,
    signInWithFacebook,
    setCurrentUser,
    signUpWithEmailAndPassword,
  } = useContext(AuthContext);

  const [showEmailForm, setShowEmailSignUp] = useState(false);
  const { setSignupPopup } = useContext(AuthPopupContext);

  /**
   * @function handleEmailSignInClick
   * @description
   * Sets the state to show the email sign-up form when the user opts for email sign-up.
   */

  const handleEmailSignInClick = () => setShowEmailSignUp(true);

  return (
    <div className="signup-content">
      <CloseButton setPopup={setSignupPopup} />

      <motion.h1>Sign up</motion.h1>
      <br />

      {showEmailForm ? (
        <SignUpForm />
      ) : (
        <>
          <AuthBtn
            icon={"/google-icon.png"}
            text="Sign up with Google"
            onClick={signInWithGoogle}
          />

          <AuthBtn
            icon={"/f-icon.png"}
            text="Sign up with Facebook"
            onClick={signInWithFacebook}
            id="facebook-btn"
          />

          <AuthBtn
            icon={"/g-icon.png"}
            text="Sign up with Email"
            onClick={() => {
              handleEmailSignInClick();
            }}
            id="gmail-btn"
          />

          {/* <button
            className="btn signup-btns"
            id="gmail-btn"
            onClick={() => {
              handleEmailSignInClick();
              // handleSignUp(signUpWithEmailAndPassword)
            }}
          >
            <div>
              <img src={gmailIcon} alt="" className="auth-icon" />
            </div>
            Sign up with Email
          </button> */}
        </>
      )}
    </div>
  );
}

export default SignUpContent;
