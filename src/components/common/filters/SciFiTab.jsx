import React, { useContext, useEffect, useState } from "react";
import { getSciFiArtworks, saveArtwork } from "../../../backend/data";
import ArtGrid from "../ArtGrid";

function MainArtGrid() {
  const [scifiArtworks, setSciFiArtworks] = useState([]);

  useEffect(() => {
    getSciFiArtworks(setSciFiArtworks);
  }, []);

  return (
    <div id="art-grid-section">
      {scifiArtworks && <ArtGrid artworks={scifiArtworks} />}
    </div>
  );
}

export default MainArtGrid;
