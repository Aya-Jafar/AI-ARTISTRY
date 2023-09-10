import React from "react";
import { motion } from "framer-motion";
import { slideAnimation } from "../utils/motion";

function Imagine() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="imagine-container"
      >
        <div className="prompt-section">
          <motion.h1 {...slideAnimation("left")}>
            Imagine Tomorrow, Create Today
          </motion.h1>
          <textarea type="text" name="" id="" />
          <br />
          <button className="btn" id="imagine-btn">
            Generate
          </button>
        </div>
        <div className="image-section">
          <img src="" alt="placeholder..." />
        </div>
      </motion.div>
    </>
  );
}

export default Imagine;
