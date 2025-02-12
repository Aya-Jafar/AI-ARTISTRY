import React from "react";
import { IMAGES } from "../../utils/constants";
import Masonry from "react-responsive-masonry";
import { motion } from "framer-motion";
import { scaleOnHover } from "../../utils/motion";

/**
 * @component
 * @description
 * The ImagineGrid component displays a grid of images using the Masonry layout.
 * It uses the `react-responsive-masonry` package to create a responsive grid and 
 * applies a hover animation on each image using the `motion` component from `framer-motion`.
 * Each image in the grid is sourced from the `IMAGES` constant array, and it scales up when hovered over.
 * 
 * @example
 * <ImagineGrid />
 */
function ImagineGrid() {
  return (
    <Masonry className="imagine-grid" columnClassName="my-masonry-grid_column">
      {IMAGES.map((image, index) => (
        <motion.div className="imagine-image-container" key={index}>
          <motion.img
            loading="lazy"
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
