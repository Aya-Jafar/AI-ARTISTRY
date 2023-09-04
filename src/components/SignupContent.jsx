import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import googleIcon from "../images/google-icon.png";
import facebookIcon from "../images/f-icon.png";
import app from "../backend/config";
import AuthContext from "../providers/Auth";

function SignUpContent() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <div className="signup-content">
      <motion.h1>Sign up</motion.h1>
      <br />

      <button className="btn signup-btns" onClick={setCurrentUser}>
        <div>
          <img src={googleIcon} alt="" className="auth-icon" />
        </div>
        Sign up with Google
      </button>

      <button className="btn signup-btns" id="facebook-btn">
        <div>
          <img src={facebookIcon} alt="" className="auth-icon" />
        </div>
        Sign up with Facebook
      </button>
    </div>
  );
}

export default SignUpContent;
