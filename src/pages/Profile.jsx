import React, { useContext, useState, useEffect } from "react";
import profileImg from "../images/profile-img.jpeg";
import AuthContext from "../providers/Auth";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
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
        {savedArtworks.map((artwork) => (
          <motion.div className="image-container">
            <motion.img
              src={artwork.image}
              alt=""
              className="artwork-image"
            />
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}

export default Profile;
