import React, { useContext, useEffect, useState } from "react";
import { getAllArtworks } from "../../../backend/data";
import ArtGrid from "./ArtGrid";

function MainArtGrid() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    getAllArtworks(setArtworks);
  }, []);

  return (
    <div id="art-grid-section">
      {artworks && <ArtGrid artworks={artworks} />}
    </div>
  );
}

export default MainArtGrid;
