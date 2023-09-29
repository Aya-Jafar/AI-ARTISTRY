import React from "react";
import images from "../../images/imagine-grid";
import Masonry from "react-responsive-masonry";
import { motion } from "framer-motion";
import { scaleOnHover } from "../../utils/motion";

function ImagineGrid() {
  return (
    <Masonry className="imagine-grid" columnClassName="my-masonry-grid_column">
      {images.map((image, index) => (
        <motion.div className="imagine-image-container" key={index}>
          <motion.img
            className="imagine-image"
            src={image}
            whileHover={scaleOnHover}
            id={`imagine-image-${index}`}
          />
        </motion.div>
      ))}
    </Masonry>
  );
}

export default ImagineGrid;
