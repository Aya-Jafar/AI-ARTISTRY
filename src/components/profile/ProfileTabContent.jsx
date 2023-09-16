import React, { useContext, useState, useEffect } from "react";
import profileImg from "../../images/profile-user.png";
import AuthContext from "../../providers/Auth";
import { motion } from "framer-motion";
import ArtGrid from "../home/grid-section/ArtGrid";
import ProfileTabContext from "../../providers/ProfileTabContent";
import { saveArtwork } from "../../backend/data";
import { slideAnimation } from "../../utils/motion";
import { getSavedArtworks, getLikedArtworks } from "../../backend/data";

function ProfileTabContent() {
  const { currentUser } = useContext(AuthContext);
  const { currentProfileTab } = useContext(ProfileTabContext);

  const [currentContent, setCurrentContent] = useState([]);

  //   useEffect(() => {
  //     generateProfileContent();
  //   }, [currentUser]);

  const generateProfileContent = () => {
    switch (currentProfileTab) {
      case "Saved":
        getSavedArtworks(currentUser, setCurrentContent);
        return <>{saveArtwork && <ArtGrid artworks={currentContent} />}</>;
      case "Liked":
        getLikedArtworks(currentUser, setCurrentContent);
        return (
          <>
            {saveArtwork && (
              <ArtGrid artworks={currentContent} {...slideAnimation("left")} />
            )}
          </>
        );
    }
  };
  //   console.log(currentContent);

  return <>{generateProfileContent()}</>;
}

export default ProfileTabContent;
