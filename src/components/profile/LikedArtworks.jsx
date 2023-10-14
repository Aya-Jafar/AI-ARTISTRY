import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../providers/Auth";
import { addToLikedActivity, getSavedArtworks } from "../../backend/data";
import ArtGrid from "../home/grid-section/ArtGrid";

function LikedArtworks() {
  const { currentUser } = useContext(AuthContext);

  const [likedArtworks, setLikedArtworks] = useState([]);

  useEffect(() => {
    addToLikedActivity(currentUser, setLikedArtworks);
  }, [currentUser]);

  // console.log(savedArtworks);

  return <>{likedArtworks && <ArtGrid artworks={likedArtworks} />}</>;
}

export default LikedArtworks;
