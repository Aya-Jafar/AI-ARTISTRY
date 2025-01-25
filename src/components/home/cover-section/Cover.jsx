import React from "react";
import { motion } from "framer-motion";
import { slideAnimation, fadeIn, stagger } from "../../../utils/motion";
import { Link as ScrollLink } from "react-scroll";
import ImageSlider from "./ImageSlider";


/**
 * @component
 * @description
 * The `Cover` component represents the landing section of the page, which includes an image slider, a motto, and a button to explore the art grid section.
 * - The component uses `framer-motion` for smooth animations.
 * - Displays the logo image, a slogan, and an "Explore" button that smooth scrolls to the art grid section on click.
 * 
 * @example
 * // Renders the cover section with logo, motto, and explore button
 * <Cover />
 */
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
