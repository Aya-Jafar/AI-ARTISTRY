import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, scaleOnHover } from "../utils/motion";
import { textVariants } from "../utils/motion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

function ArtGrid({ artworks }) {
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      {artworks && (
        <ResponsiveMasonry
          style={{ width: "100%" }}
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                className="image-container"
                ref={ref}
                onMouseOver={() => setHoveredArtwork(artwork)}
                onMouseOut={() => setHoveredArtwork(null)}
              >
                <Link to={`/artwork/${artwork.id}`}>
                  <motion.img
                    src={artwork.image}
                    alt=""
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="artwork-image"
                    variants={fadeIn}
                  />
                </Link>
                <motion.div>
                  {hoveredArtwork === artwork && (
                    <motion.h3
                      className="hover-text"
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      variants={textVariants}
                    >
                      {artwork.prompt}
                    </motion.h3>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}

export default ArtGrid;
