import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../utils/motion";
import SignUpContent from "./SignupContent";
import LoginContent from "./LoginContent";
import AuthPopupContext from "../providers/AuthPopup";

function Popup() {
  const { loginPopup, signupPopup } = useContext(AuthPopupContext);

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
          <LoginContent />
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
          <SignUpContent />
        </motion.div>
      );
    }
  };

  return <AnimatePresence>{generatePopupContent()}</AnimatePresence>;
}

export default Popup;
