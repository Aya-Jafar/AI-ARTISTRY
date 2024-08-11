import React from "react";
import { motion } from "framer-motion";
import { slideAnimation, fadeIn, stagger } from "../../../utils/motion";
import { Link as ScrollLink } from "react-scroll";
import ImageSlider from "./ImageSlider";

function Cover() {
 
  return (
    <motion.div
      className="cover"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <ImageSlider/>

      <motion.div className="cover-text" variants={stagger}>
        <motion.div variants={fadeIn} {...slideAnimation("left")}>
          <img src="/logo-without-bg.png" alt="" id="logo" />
        </motion.div>

        <motion.h2
          className="motto"
          variants={fadeIn}
          {...slideAnimation("left")}
        >
          Create & Collect
        </motion.h2>
        
        <motion.div id="explore-btn" variants={fadeIn}>
          <ScrollLink
            to="art-grid-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1000}
          >
            <button className="btn">{"explore".toUpperCase()}</button>
          </ScrollLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Cover;
