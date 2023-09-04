import React from "react";
import { motion } from "framer-motion";
import logo from "../images/logo-without-bg.png";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../animation/motion";

function Cover() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const scaleOnHover = {
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      className="cover"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div className="cover-text" variants={stagger}>
        <motion.div variants={fadeIn} {...slideAnimation("left")}>
          <img src={logo} alt="" id="logo" />
          {/* <span className="highlight">AI </span>
          {"Artistry".toUpperCase()} */}
        </motion.div>

        <motion.h2
          className="motto"
          variants={fadeIn}
          {...slideAnimation("left")}
        >
          Create & Collect
        </motion.h2>
        <motion.div
          id="explore-btn"
          variants={fadeIn}
          whileHover={scaleOnHover}
        >
          <button className="btn">{"explore".toUpperCase()}</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Cover;
