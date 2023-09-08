import React, { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { getAllArtworks, saveArtwork } from "../backend/data";
import AuthContext from "../providers/Auth";
import { Link } from "react-router-dom";

function ArtGrid() {
  const [artworks, setArtworks] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getAllArtworks(setArtworks);
  }, []);

  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {artworks.map((artwork) => (
        <Link
          to={`/artwork/${artwork.id}`}
          key={artwork.id}
          className="image-container"
          onClick={() => saveArtwork(currentUser, artwork.id)}
        >
          <img src={artwork.image} alt="" />
        </Link>
      ))}
    </Masonry>
  );
}

export default ArtGrid;
