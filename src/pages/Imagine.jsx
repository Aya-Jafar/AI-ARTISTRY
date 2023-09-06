import React from "react";
import { motion } from "framer-motion";

function Imagine() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity:1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="imagine-container"
      >
        <div className="prompt-section">
          {/* <h1>Imagine</h1> */}
          <h1>Imagine Tomorrow, Create Today ✨</h1>
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
