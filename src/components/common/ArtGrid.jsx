import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, scaleOnHover } from "../../utils/motion";
import { textVariants } from "../../utils/motion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function ArtGrid({ artworks, label }) {
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  // console.log(artworks);

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
            {artworks.map((artwork, index) => (
              <motion.div
                key={index}
                className="image-container"
                ref={ref}
                onMouseOver={() => setHoveredArtwork(artwork)}
                onMouseOut={() => setHoveredArtwork(null)}
              >
                {label === "home" ? (
                  // Artworks in home page
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
                ) : (
                  <>
                    {/* Posts tab */}
                    {label === "posts" ? (
                      <>
                        {artwork.postUrl && (
                          <Link
                            to={`/post/${encodeURIComponent(
                              artwork.postUrl
                            )}`}
                          >
                            <motion.img
                              src={artwork.postUrl}
                              alt=""
                              initial="hidden"
                              animate={inView ? "visible" : "hidden"}
                              className="artwork-image"
                              variants={fadeIn}
                            />
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Saved tab */}
                        {/* If saved image is generated */}
                        {artwork.generatedImageUrl ? (
                          <Link
                            to={`/artwork/generated/${encodeURIComponent(
                              artwork.generatedImageUrl.slice(-50)
                            )}`}
                          >
                            <motion.img
                              src={artwork.generatedImageUrl}
                              alt=""
                              initial="hidden"
                              animate={inView ? "visible" : "hidden"}
                              className="artwork-image"
                              variants={fadeIn}
                              style={{
                                filter: `brightness(${artwork.brightness}%) contrast(${artwork.contrast}%)`,
                              }}
                            />
                          </Link>
                        ) : (
                          // if it's normal saved artwork from home page
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
                        )}
                      </>
                    )}
                  </>
                )}

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
