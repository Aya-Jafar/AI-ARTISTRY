import React, { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import googleIcon from "../images/google-icon.png";
import facebookIcon from "../images/f-icon.png";
import gmailIcon from "../images/g-icon.png";
import AuthContext from "../providers/Auth";
import closeIcon from "../images/close.png";
import { handleSignIn } from "../backend/auth";
import CloseBtn from "./CloseBtn";
import AuthBtn from "./AuthBtn";
import LoginForm from "./LoginForm";

function LoginContent({ loginPopup, setLoginPopup }) {
  const {
    signInWithGoogle,
    signInWithFacebook,
    setCurrentUser,
    signInWithEmailAndPassword,
  } = useContext(AuthContext);

  //   const [isEmailBtnClicked, setIsEmailBtnClicked] = useState(false);
  const [showEmailForm, setShowEmailSignIn] = useState(false);

  const handleEmailSignInClick = () => setShowEmailSignIn(true);

  return (
    <>
      <div className="signup-content">
        <CloseBtn setPopup={setLoginPopup} />
        <h1>Log in</h1>
        <br />
        <>
          {showEmailForm ? (
            <LoginForm />
          ) : (
            <>
              <AuthBtn
                icon={googleIcon}
                text="Log in with Google"
                onClick={signInWithGoogle}
              />

              <AuthBtn
                icon={facebookIcon}
                text="Log in with Facebook"
                onClick={signInWithFacebook}
                id="facebook-btn"
              />

              <AuthBtn
                icon={gmailIcon}
                text="Log in with Email"
                onClick={() => {
                  handleEmailSignInClick();
                }}
                id="gmail-btn"
              />
            </>
          )}
        </>
      </div>
    </>
  );
}

export default LoginContent;
