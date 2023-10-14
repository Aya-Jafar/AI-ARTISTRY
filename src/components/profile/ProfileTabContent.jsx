import React, { useContext, useState, useEffect } from "react";
import profileImg from "../../images/profile-user.png";
import AuthContext from "../../providers/Auth";
import { motion } from "framer-motion";
import ArtGrid from "../common/ArtGrid";
import ProfileTabContext from "../../providers/ProfileTabContent";
import { getPosts } from "../../backend/data";
import {
  getSavedArtworks,
  addToLikedActivity,
  getUserActivity,
} from "../../backend/data";
import UserActivity from "./ActivityTab";

function ProfileTabContent() {
  const { currentUser } = useContext(AuthContext);
  const { currentProfileTab } = useContext(ProfileTabContext);

  const [currentContent, setCurrentContent] = useState([]);

  const generateProfileContent = () => {
    switch (currentProfileTab) {
      case "Posts":
        getPosts(currentUser, setCurrentContent);
        return <ArtGrid artworks={currentContent} label="posts" />;

      case "Saved":
        getSavedArtworks(currentUser, setCurrentContent);
        return <ArtGrid artworks={currentContent} label="saved" />;

      case "Activity":
        getUserActivity(currentUser, setCurrentContent);
        return <UserActivity activities={currentContent} />;
    }
  };

  return <>{generateProfileContent()}</>;
}

export default ProfileTabContent;
