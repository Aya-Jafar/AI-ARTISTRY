import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../utils/motion";
import SignUpContent from "./SignupContent";
import LoginContent from "./LoginContent";

function Popup(props) {
  const { loginPopup, setLoginPopup, signupPopup, setSignupPopup } = props;

  const generatePopupContent = () => {
    if (loginPopup) {
      return (
        <motion.div
          className="popup"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={popupVariants}
        >
          <LoginContent loginPopup={loginPopup} setLoginPopup={setLoginPopup} />
        </motion.div>
      );
    }
    if (signupPopup) {
      return (
        <motion.div
          className="popup"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={popupVariants}
        >
          <SignUpContent setSignupPopup={setSignupPopup} />
        </motion.div>
      );
    }
  };

  return <AnimatePresence>{generatePopupContent()}</AnimatePresence>;
}

export default Popup;
