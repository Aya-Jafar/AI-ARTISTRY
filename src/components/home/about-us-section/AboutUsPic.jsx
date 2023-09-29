import React from "react";
import { stagger, fadeIn, scaleOnHover } from "../../../utils/motion";
import { motion } from "framer-motion";


function AboutUsPic({ src, inView }) {
  return (
    <motion.div className="about-us-pic" variants={fadeIn}>
      <motion.img
        src={src}
        alt=""
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Animate when in view
        variants={fadeIn}
        whileHover={scaleOnHover}
      />
    </motion.div>
  );
}

export default AboutUsPic;
