import React, { useContext, useState, useEffect } from "react";
import profileImg from "../images/profile-img.jpeg";
import AuthContext from "../providers/Auth";
import Masonry from "react-masonry-css";
import { getSavedArtworks } from "../backend/data";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  const [savedArtworks, setSavedArtworks] = useState([]);

  useEffect(() => {
    getSavedArtworks(currentUser, setSavedArtworks);
  }, [currentUser]);

  return (
    <div className="profile">
      <div className="profile-image">
        <img src={profileImg} alt="" />
      </div>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {savedArtworks.map((artwork, index) => (
          <div key={index} className="image-container">
            <img src={artwork.image} alt="" />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default Profile;
