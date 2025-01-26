import React, { useContext, useState, useEffect } from "react";
import { getSavedArtworks, getUserInfo } from "../backend/data";
import { ProfileTabProvider } from "../providers/ProfileTabContent";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileTabContent from "../components/profile/ProfileTabContent";
import { useParams } from "react-router-dom";
import AuthPopupContext from "../providers/AuthPopup";

/**
 * @description
 * The Profile component is used to display a user's profile information.
 * It fetches and displays user details such as name, email, and profile image,
 * and shows their saved artworks. It also includes tabs for navigating different sections
 * of the profile, like saved artworks and other relevant data.
 *
 **/

function Profile() {
  /**
   * @description
   * This section of the Profile component contains state variables and context hooks
   * that manage the user's profile information and saved artworks:
   * - `savedArtworks` state stores the list of artworks saved by the user.
   * - `userInfo` state stores the user's profile details like name, email, and profile image.
   * - `uid` is extracted from the URL parameters to fetch user-specific data.
   **/
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { loginPopup, signupPopup } = useContext(AuthPopupContext);
  const isBlured = loginPopup || signupPopup;
  const { uid } = useParams();

  /**
   * @effect
   * @description
   * Fetches the saved artworks and user information when the component is mounted.
   * - Calls `getSavedArtworks` to fetch the saved artworks of the user.
   * - Calls `getUserInfo` to fetch the user's profile information.
   * @dependencies [uid]
   **/
  useEffect(() => {
    getSavedArtworks(uid, setSavedArtworks);
    getUserInfo(uid).then((result) => setUserInfo(result));
  }, [uid]);

  return (
    <div className={`profile ${isBlured ? "blur-background" : ""}`}>
      <div>
        {userInfo ? (
          <img src={userInfo.image} alt="" className="profile-image" />
        ) : (
          <img src={"/profile-user.png"} alt="" className="profile-image" />
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
