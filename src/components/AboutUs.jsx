import React from "react";
import pic1 from "../images/space.jpg";
import pic2 from "../images/girl.png";
import pic3 from "../images/space2.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AboutUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleOnHover = {
    scale: 1.1,
    transition: { duration: 0.3 },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.4 } },
  };

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
          <motion.div className="about-us-pic" variants={fadeIn}>
            <motion.img
              src={pic1}
              alt=""
              initial="hidden"
              animate={inView ? "visible" : "hidden"} // Animate when in view
              variants={fadeIn}
              whileHover={scaleOnHover}
            />
          </motion.div>
          <motion.div className="about-us-pic" variants={fadeIn}>
            <motion.img
              src={pic2}
              alt=""
              initial="hidden"
              animate={inView ? "visible" : "hidden"} // Animate when in view
              variants={fadeIn}
              whileHover={scaleOnHover}
            />
          </motion.div>
          <motion.div className="about-us-pic" variants={fadeIn}>
            <motion.img
              src={pic3}
              alt=""
              initial="hidden"
              animate={inView ? "visible" : "hidden"} // Animate when in view
              variants={fadeIn}
              whileHover={scaleOnHover}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutUs;
