import React, { useContext, useState, useEffect, Suspense, lazy } from "react";
import ProfileTabContext from "../../providers/ProfileTabContent";
import {
  getPosts,
  getSavedArtworks,
  getUserActivity,
} from "../../backend/data";

// Lazy load components
const ArtGrid = lazy(() => import("../common/ArtGrid"));
const UserActivity = lazy(() => import("./ActivityTab"));

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
   * @effect
   * @description
   * Fetches data based on the current active tab whenever it changes.
   */
  useEffect(() => {
    const fetchData = async () => {
      switch (currentProfileTab) {
        case "Posts":
          await getPosts(uid, setCurrentContent);
          break;
        case "Saved":
          await getSavedArtworks(uid, setCurrentContent);
          break;
        case "Activity":
          await getUserActivity(uid, setCurrentContent);
          break;
        default:
          setCurrentContent([]);
          break;
      }
    };

    fetchData();
  }, [currentProfileTab, uid]);

  /**
   * @function generateProfileContent
   * @description
   * Determines the content to render based on the current active tab.
   *
   * @returns {JSX.Element} The JSX content for the active profile tab.
   */
  const generateProfileContent = () => {
    switch (currentProfileTab) {
      case "Posts":
        return <ArtGrid artworks={currentContent} label="posts" />;
      case "Saved":
        return <ArtGrid artworks={currentContent} label="saved" />;
      case "Activity":
        return <UserActivity activities={currentContent} />;
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<span class="loader"></span>}>
      {generateProfileContent()}
    </Suspense>
  );
}

export default ProfileTabContent;
