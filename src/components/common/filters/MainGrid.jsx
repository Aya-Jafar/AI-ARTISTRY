import React, { useContext, useEffect, useState } from "react";
import { getAllArtworks } from "../../../backend/data";
import ArtGrid from "../grid-section/ArtGrid";
import moreIcon from "../../../images/maximize.png";
import ButtonWithIcon from "../ButtonWithIcon";
import generateIcon from "../../../images/noun-generate-6053204.png";
import { Link } from "react-router-dom";

function MainArtGrid({ isHomePage }) {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    getAllArtworks(setArtworks);
  }, []);

  return (
    <>
      <div id="art-grid-section">
        {artworks && <ArtGrid artworks={artworks} />}
      </div>
      {isHomePage && (
        <div className="art-grid-btns">
          <Link to="/imagine">
            <ButtonWithIcon icon={generateIcon} text="Generate" />
          </Link>
          <Link to="/artworks/more/">
            <ButtonWithIcon icon={moreIcon} text="More" />
          </Link>
        </div>
      )}
    </>
  );
}

export default MainArtGrid;
