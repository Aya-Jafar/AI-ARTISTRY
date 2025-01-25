import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stagger, fadeIn, scaleOnHover } from "../../../utils/motion";
import AboutUsPic from "./AboutUsPic";


/**
 * @component
 * @description
 * `AboutUs` is a React component that displays information about the platform and its features. It includes a section with a heading, a paragraph, and images that are revealed with an animation when they come into view.
 * - The content is animated using the `framer-motion` library for smooth transitions as the user scrolls.
 * - The component utilizes the `react-intersection-observer` library to trigger animations when the section comes into view.
 * 
 * @dependencies
 * - `motion` from `framer-motion`: Used for animation effects.
 * - `useInView` from `react-intersection-observer`: Detects when the component enters the viewport to trigger animations.
 * - `AboutUsPic`: A child component used to display images with a fade-in effect.
 * 
 * @example
 * // Renders the About Us section with animated content
 * <AboutUs />
 */
function AboutUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.02,
  });

  return (
    <div className="about-us" ref={ref}>
      <motion.div
        className="about-us-container"
        initial="hidden"
        animate={inView ? "visible" : "hidden"} // Animate when in view
        variants={stagger}
      >
        <motion.h1 variants={fadeIn}>ABOUT US</motion.h1>
        <motion.p variants={fadeIn}>
          Whether you're an art enthusiast looking to collect unique pieces or
          an artist seeking inspiration, our platform offers a seamless
          experience. to create your own AI-generated art or browse our curated
          selection of AI artworks, all in one place. <br /> <br />
          Join us at AI ARTISTRY and embark on a journey where every pixel is a
          stroke of genius
        </motion.p>
        <div className="about-us-pics">
          <AboutUsPic src={"/space.jpg"} inView={inView} />
          <AboutUsPic src={"/girl.png"} inView={inView} />
          <AboutUsPic src={"/space2.png"} inView={inView} />
        </div>
      </motion.div>
    </div>
  );
}

export default AboutUs;
