import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, scaleOnHover } from "../../../utils/motion";
import { textVariants } from "../../../utils/motion";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function ArtGrid({ artworks }) {
  const [hoveredArtwork, setHoveredArtwork] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  // console.log(artworks);

  return (
    <>
      {/* {artworks.length === 0 && (
        <>
          {[...Array(artworks.length)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={400} // Set width dynamically
              height={500} // Set height dynamically
              animate="wave"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
              }}
            />
          ))}
        </>
      )} */}

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
                {artwork.id ? (
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
                    {/* <button
                      onMouseOver={() =>
                        console.log(
                          artwork.generatedImageUrl
                            .split("data:image/jpeg;base64,/9j/")[1]
                            .slice(0, 50)
                        )
                      }
                    >
                      Hover me
                    </button> */}
                    <Link
                      to={`/artwork/generated/${encodeURIComponent(
                        artwork.generatedImageUrl.slice(0, 50)
                      )}`}
                    >
                      <motion.img
                        src={artwork.generatedImageUrl}
                        alt=""
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="artwork-image"
                        variants={fadeIn}
                      />
                    </Link>
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
