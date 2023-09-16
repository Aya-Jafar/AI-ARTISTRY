import React, { useState, useEffect } from "react";
import { slideAnimation, fadeAnimation } from "../../../utils/motion";
import { motion } from "framer-motion";
import { getFantasyArtworks } from "../../../backend/data";
import ArtGrid from "./ArtGrid";

function FantasyTab() {
  const [fantasyArtworks, setFantasyArtworks] = useState([]);

  useEffect(() => {
    getFantasyArtworks(setFantasyArtworks);
  }, []);

  return (
    <motion.div {...slideAnimation("left")}>
      {fantasyArtworks && <ArtGrid artworks={fantasyArtworks} />}
    </motion.div>
  );
}

export default FantasyTab;
