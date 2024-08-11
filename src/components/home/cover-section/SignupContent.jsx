import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../../providers/Auth";
import { handleSignUp } from "../../../backend/auth";
import CloseButton from "./CloseButton";
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
