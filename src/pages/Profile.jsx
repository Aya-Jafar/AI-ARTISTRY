import React, { useContext, useState, useEffect } from "react";
import profileImg from "../images/profile-user.png";
import AuthContext from "../providers/Auth";
import { motion } from "framer-motion";
import { getSavedArtworks } from "../backend/data";
import ArtGrid from "../components/ArtGrid";
import { ProfileTabProvider } from "../providers/ProfileTabContent";
import ProfileTabContext from "../providers/ProfileTabContent";
import ProfileTabs from "../components/ProfileTabs";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  const [savedArtworks, setSavedArtworks] = useState([]);

  useEffect(() => {
    getSavedArtworks(currentUser, setSavedArtworks);
  }, [currentUser]);

  // console.log(savedArtworks);

  return (
    <div className="profile">
      <div className="profile-image">
        <img src={profileImg} alt="" />
      </div>
      <h1>{currentUser && currentUser.displayName}</h1>
      <ProfileTabProvider>
        <ProfileTabs />
      </ProfileTabProvider>
      {savedArtworks && <ArtGrid artworks={savedArtworks} />}
    </div>
  );
}

export default Profile;
