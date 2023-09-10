import { useInView } from "react-intersection-observer";
import React, { useContext, useEffect, useState } from "react";
import { getAllArtworks, saveArtwork } from "../backend/data";
import AuthContext from "../providers/Auth";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "framer-motion";
import { fadeIn, scaleOnHover } from "../utils/motion";
import {textVariants } from '../utils/motion'

function MainArtGrid() {
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    getAllArtworks(setArtworks);
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      {artworks && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {artworks.map((artwork) => (
              <motion.div
                className="image-container"
                ref={ref}
                onMouseOver={() => setHoveredArtwork(artwork)}
                onMouseOut={() => setHoveredArtwork(null)}

                // whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={`/artwork/${artwork.id}`}
                  key={artwork.id}
                  // onClick={() => saveArtwork(currentUser, artwork.id)}
                >
                  <motion.img
                    src={artwork.image}
                    alt=""
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="artwork-image"
                    variants={fadeIn}
                    // whileHover="hovered"
                    // whileHover={scaleOnHover}
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
                      dssssss
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

export default MainArtGrid;
