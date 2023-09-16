import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import googleIcon from "../../../images/google-icon.png";
import facebookIcon from "../../../images/f-icon.png";
import gmailIcon from "../../../images/g-icon.png";
import AuthContext from "../../../providers/Auth";
import { handleSignUp } from "../../../backend/auth";
import CloseBtn from "./CloseBtn";
import AuthBtn from "./AuthBtn";
import SignUpForm from "./SignUpForm";
import AuthPopupContext from "../../../providers/AuthPopup";


function SignUpContent() {
  const {
    signInWithGoogle,
    signInWithFacebook,
    setCurrentUser,
    signUpWithEmailAndPassword,
  } = useContext(AuthContext);

  const [showEmailForm, setShowEmailSignUp] = useState(false);
  const { setSignupPopup } = useContext(AuthPopupContext);

  const handleEmailSignInClick = () => setShowEmailSignUp(true);

  return (
    <div className="signup-content">
      <CloseBtn setPopup={setSignupPopup} />

      <motion.h1>Sign up</motion.h1>
      <br />

      {showEmailForm ? (
        <SignUpForm />
      ) : (
        <>
          <AuthBtn
            icon={googleIcon}
            text="Sign up with Google"
            onClick={signInWithGoogle}
          />

          <AuthBtn
            icon={facebookIcon}
            text="Sign up with Facebook"
            onClick={signInWithFacebook}
            id="facebook-btn"
          />

          <AuthBtn
            icon={gmailIcon}
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
