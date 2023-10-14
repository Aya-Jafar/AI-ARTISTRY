import React, { useContext, useState, useEffect } from "react";
import profileImg from "../images/profile-user.png";
import AuthContext from "../providers/Auth";
import { motion } from "framer-motion";
import { getSavedArtworks } from "../backend/data";
import { ProfileTabProvider } from "../providers/ProfileTabContent";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileTabContent from "../components/profile/ProfileTabContent";
import { useParams } from "react-router-dom";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [savedArtworks, setSavedArtworks] = useState([]);

  const { uid } = useParams();

  useEffect(() => {
    getSavedArtworks(currentUser, setSavedArtworks);
  }, [currentUser]);

  return (
    <div className="profile">
      <div className="profile-image">
        <img src={profileImg} alt="" />
      </div>
      <h1>{currentUser && currentUser.displayName}</h1>
      <ProfileTabProvider>
        <ProfileTabs />
        <ProfileTabContent />
      </ProfileTabProvider>

      {/* {savedArtworks && <ArtGrid artworks={savedArtworks} />} */}
    </div>
  );
}

export default Profile;
