import React, { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import googleIcon from "../../../images/google-icon.png";
import facebookIcon from "../../../images/f-icon.png";
import gmailIcon from "../../../images/g-icon.png";
import AuthContext from "../../../providers/Auth";
import CloseButton from "./CloseButton";
import AuthBtn from "./AuthBtn";
import LoginForm from "./LoginForm";
import AuthPopupContext from "../../../providers/AuthPopup";

function LoginContent() {
  const { signInWithGoogle, signInWithFacebook } = useContext(AuthContext);

  const [showEmailForm, setShowEmailSignIn] = useState(false);

  const { setLoginPopup } = useContext(AuthPopupContext);

  const handleEmailSignInClick = () => setShowEmailSignIn(true);

  return (
    <>
      <div className="signup-content">
        <CloseButton setPopup={setLoginPopup} />
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
              <br />
              <br />
              <br />
              {/* <h4>
                Don't have an account yet?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#50d5ff" }}
                  id="signup-from-login"
                >
                  Sign up now
                </Link>
              </h4> */}
            </>
          )}
        </>
      </div>
    </>
  );
}

export default LoginContent;
