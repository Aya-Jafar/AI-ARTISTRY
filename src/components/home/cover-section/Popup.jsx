import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../../../utils/motion";
import SignUpContent from "./SignupContent";
import LoginContent from "./LoginContent";
import AuthPopupContext from "../../../providers/AuthPopup";

/**
 * @component
 * @description
 * The `Popup` component renders a modal popup for either login or signup content.
 * - It listens for changes to the `loginPopup` and `signupPopup` states from the `AuthPopupContext`.
 * - Depending on the state, it dynamically renders the respective content (`LoginContent` or `SignUpContent`).
 * - The popup appears with animations using `framer-motion` and `AnimatePresence` for smooth transitions.
 *
 * @example
 * <Popup />
 *
 */
function Popup() {
  const { loginPopup, signupPopup } = useContext(AuthPopupContext);

  /**
   * @function generatePopupContent
   * @description
   * Conditionally renders the content based on the active popup state.
   * - If `loginPopup` is true, render `LoginContent`.
   * - If `signupPopup` is true, render `SignUpContent`.
   *
   * @returns {JSX.Element} The respective popup content.
   */
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
