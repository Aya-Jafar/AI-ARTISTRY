import React from "react";
import { stagger, fadeIn, scaleOnHover } from "../../../utils/motion";
import { motion } from "framer-motion";

/**
 * @component
 * @description
 * `AboutUsPic` is a React component that renders an image with a fade-in animation when it comes into view. The image also scales up slightly when hovered over, adding a smooth interaction effect.
 * - The image animation is handled using `framer-motion` for smooth transitions.
 * - The `inView` prop determines whether the image should animate when it becomes visible in the viewport.
 * 
 * @param {Object} props
 * @param {string} props.src - The source URL of the image to be displayed.
 * @param {boolean} props.inView - A flag indicating whether the component is in the viewport, triggering the fade-in animation.
 * 
 * @example
 * // Renders an image that fades in when in view and scales on hover
 * <AboutUsPic src={"/space.jpg"} inView={inView} />
 */
function AboutUsPic({ src, inView }) {
  return (
    <motion.div className="about-us-pic" variants={fadeIn}>
      <motion.img
        loading="lazy"
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
