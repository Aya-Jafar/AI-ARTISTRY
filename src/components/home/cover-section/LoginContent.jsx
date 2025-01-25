import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../providers/Auth";
import CloseButton from "./CloseButton";
import AuthBtn from "./AuthBtn";
import LoginForm from "./LoginForm";
import AuthPopupContext from "../../../providers/AuthPopup";

/**
 * @component
 * @description
 * The `LoginContent` component provides the UI and logic for the login screen.
 * - Displays different login options, including Google, Facebook, and Email-based authentication.
 * - If the user chooses to log in via email, it shows a form for email login.
 * - Integrates with `AuthContext` for handling authentication and `AuthPopupContext` for controlling the visibility of the login popup.
 * 
 * @example
 * // Renders the login content with available authentication options
 * <LoginContent />
 */

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
                icon={"/google-icon.png"}
                text="Log in with Google"
                onClick={signInWithGoogle}
              />

              <AuthBtn
                icon={"/f-icon.png"}
                text="Log in with Facebook"
                onClick={signInWithFacebook}
                id="facebook-btn"
              />

              <AuthBtn
                icon={"/g-icon.png"}
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
