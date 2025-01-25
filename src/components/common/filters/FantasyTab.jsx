import React, { useState, useEffect } from "react";
import { slideAnimation, fadeAnimation } from "../../../utils/motion";
import { motion } from "framer-motion";
import { getFantasyArtworks } from "../../../backend/data";
import ArtGrid from "../ArtGrid";

/**
 * @description
 * The `FantasyTab` component is responsible for fetching and displaying a grid of fantasy-themed artworks.
 * - It uses the `getFantasyArtworks` function to fetch a set of artworks (limited to 10).
 * - The `ArtGrid` component is used to display the fetched artworks in a responsive grid format.
 * - The `slideAnimation` motion effect is applied to the container for smooth transitions.
 * 
 * @component
 * @example
 * <FantasyTab />
 */
function FantasyTab() {
  const [fantasyArtworks, setFantasyArtworks] = useState([]);

  useEffect(() => {
    getFantasyArtworks(setFantasyArtworks,10);
  }, []);

  return (
    <motion.div {...slideAnimation("left")}>
      {fantasyArtworks && <ArtGrid artworks={fantasyArtworks} />}
    </motion.div>
  );
}

export default FantasyTab;
