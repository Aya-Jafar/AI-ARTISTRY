import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../animation/motion";
import SignUpContent from "./SignupContent";

function Popup(props) {
  const { loginPopup } = props;

//   console.log(loginPopup, signupPopup);

  return (
    <AnimatePresence>
      {loginPopup ? (
        <motion.div
          className="popup"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={popupVariants}
        >
          <h1>LOG in</h1>
        </motion.div>
      ) : (
        <motion.div
          className="popup"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={popupVariants}
        >
          <SignUpContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;
