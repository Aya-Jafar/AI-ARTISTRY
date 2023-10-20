import React, { useContext, useState, useEffect } from "react";
import profileImg from "../images/profile-user.png";
import AuthContext from "../providers/Auth";
import { motion } from "framer-motion";
import { getSavedArtworks, getUserInfo } from "../backend/data";
import { ProfileTabProvider } from "../providers/ProfileTabContent";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileTabContent from "../components/profile/ProfileTabContent";
import { useParams } from "react-router-dom";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [savedArtworks, setSavedArtworks] = useState([]);

  const [userInfo, setUserInfo] = useState(null);

  const { uid } = useParams();

  useEffect(() => {
    getSavedArtworks(uid, setSavedArtworks);
    getUserInfo(uid).then((result) => setUserInfo(result));
  }, [currentUser]);

  
  return (
    <div className="profile">
      <div className="profile-image">
        {userInfo !== null ? (
          <img src={userInfo.image} alt="" className="profile-image" />
        ) : (
          <img src={profileImg} alt="" />
        )}
      </div>
      <h1>{userInfo && userInfo.name}</h1>
      <h4>{userInfo && userInfo.email}</h4>

      <ProfileTabProvider>
        <ProfileTabs />
        <ProfileTabContent uid={uid} />
      </ProfileTabProvider>
    </div>
  );
}

export default Profile;
