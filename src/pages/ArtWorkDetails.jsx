import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtworkDetails } from "../backend/data";
import { motion } from "framer-motion";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [currentArtwork, setCurrentArtwork] = useState(null);
  
  // Fetch the artwork details using the "id" parameter
  useEffect(() => {
    getArtworkDetails(id, setCurrentArtwork);
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="artwork-detail"
    >
      {/* <motion.div className="artwork-detail-img"> */}
        {currentArtwork && <motion.img src={currentArtwork.image} alt="" style={{ width: "50%" }}/>}
      {/* </motion.div> */}

      <h1>Artwork Details</h1>
    </motion.div>
  );
};

export default ArtworkDetail;
