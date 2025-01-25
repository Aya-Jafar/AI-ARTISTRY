import { useState, useEffect } from "react";
import { isArtworkSaved, isArtworkLiked } from "../backend/data";
import { ICONS } from "../utils/constants";

/**
 * @description
 * The `useArtworkIcons` hook manages the state for the icons representing whether
 * an artwork is saved or liked by the current user. It checks the artwork's saved
 * and liked status based on the user's ID and the artwork's ID.
 *
 * The hook returns the current states of the save and like icons, as well as setter functions
 * to update those icons. The icons are updated based on whether the artwork is saved or liked
 * by the current user.
 *
 * It uses `useState` for local state management of the icons and `useEffect` to check the status
 * of the artwork upon initial render or when `currentUser` or `artId` change.
 *
 * @param {Object} currentUser - The current user object containing user details.
 * @param {string} artId - The ID of the artwork being checked for saved and liked status.
 * @returns {Object} An object containing the current state of the `saveIcon` and `likeIcon`,
 *                   as well as setter functions to update the icon states.
 */
const useArtworkIcons = (currentUser, artId) => {
  const [saveIcon, setSaveIcon] = useState(ICONS.unsave);
  const [likeIcon, setLikeIcon] = useState(ICONS.unliked);

  /**
   * @effect
   * @description
   * This effect loads the icons based on the saved and liked status of the artwork.
   * It checks if the artwork is saved or liked by the current user and updates the
   * state of the `saveIcon` and `likeIcon` accordingly.
   *
   * - If the artwork is saved, the `saveIcon` is updated to the bookmarked icon.
   * - If the artwork is liked, the `likeIcon` is updated to the liked heart icon.
   *
   * @dependencies [currentUser, artId]
   */
  useEffect(() => {
    const loadIcons = async () => {
      const isSaved = await isArtworkSaved(currentUser, artId);
      const isFavourite = await isArtworkLiked(currentUser, artId);

      // Update the local state based on the artwork's saved and liked status
      setSaveIcon(isSaved ? ICONS.save : ICONS.unsave);
      setLikeIcon(isFavourite ? ICONS.liked : ICONS.unliked);
    };

    loadIcons();
  }, [currentUser, artId]);

  return { saveIcon, likeIcon, setSaveIcon, setLikeIcon };
};

export default useArtworkIcons;
