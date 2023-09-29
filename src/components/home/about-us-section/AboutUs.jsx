import React from "react";
import pic1 from "../../../images/space.jpg";
import pic2 from "../../../images/girl.png";
import pic3 from "../../../images/space2.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { stagger, fadeIn, scaleOnHover } from "../../../utils/motion";
import AboutUsPic from "./AboutUsPic";

function AboutUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
          <AboutUsPic src={pic1} inView={inView} />
          <AboutUsPic src={pic2} inView={inView} />
          <AboutUsPic src={pic3} inView={inView} />
        </div>
      </motion.div>
    </div>
  );
}

export default AboutUs;
