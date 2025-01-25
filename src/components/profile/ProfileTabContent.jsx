import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArtGrid from "../common/ArtGrid";
import ProfileTabContext from "../../providers/ProfileTabContent";
import { getPosts } from "../../backend/data";
import { getSavedArtworks, getUserActivity } from "../../backend/data";
import UserActivity from "./ActivityTab";

/**
 * @component
 * @description
 * The `ProfileTabContent` component renders different content based on the current active tab of the user's profile.
 * It handles three types of content: "Posts", "Saved", and "Activity", by fetching the relevant data and passing it
 * to corresponding components.
 *
 * @param {string} uid - The unique user ID used to fetch data (posts, saved artworks, or activity) for the user.
 *
 * @example
 * <ProfileTabContent uid="12345" />
 */

function ProfileTabContent({ uid }) {
  const { currentProfileTab } = useContext(ProfileTabContext);
  const [currentContent, setCurrentContent] = useState([]);

  /**
   * @function generateProfileContent
   * @description
   * The `generateProfileContent` function is responsible for determining which type of content to fetch and render
   * based on the active profile tab (Posts, Saved, or Activity). It handles data fetching asynchronously and renders
   * corresponding components with the fetched data.
   *
   * @returns {JSX.Element} The JSX component based on the active profile tab.
   * @example
   * // Example of how generateProfileContent would be used internally:
   * const content = generateProfileContent();
   */
  const generateProfileContent = () => {
    switch (currentProfileTab) {
      case "Posts":
        getPosts(uid, setCurrentContent);
        return <ArtGrid artworks={currentContent} label="posts" />;

      case "Saved":
        getSavedArtworks(uid, setCurrentContent);
        return <ArtGrid artworks={currentContent} label="saved" />;

      case "Activity":
        getUserActivity(uid, setCurrentContent);
        return <UserActivity activities={currentContent} />;

      default:
        return <></>;
    }
  };

  return <>{generateProfileContent()}</>;
}

export default ProfileTabContent;
