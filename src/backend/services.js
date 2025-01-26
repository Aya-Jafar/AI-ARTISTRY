import {
  isArtworkSaved,
  isArtworkLiked,
  saveArtwork,
  addToLikedActivity,
} from "./data";
import { ICONS } from "../utils/constants";


/**
 * Saves artwork to the user's profile and updates the UI accordingly.
 * @param {Object} currentUser - The current authenticated user.
 * @param {string} artId - The unique ID of the artwork to be saved.
 * @param {Function} setSaveIcon - Function to update the save icon.
 * @param {Function} setShowSnackBar - Function to control the visibility of the snack bar.
 * @returns {Promise<void>} Resolves after saving artwork and updating UI.
 */
export const saveToProfile = async (
  currentUser,
  artId,
  setSaveIcon,
  setShowSnackBar,
) => {
  if (currentUser) {
    await saveArtwork(currentUser, artId); // Wait for the artwork to be saved
    const isSaved = await isArtworkSaved(currentUser, artId); // Check if it's saved
    if (isSaved) {
      setSaveIcon(ICONS.save);
      setShowSnackBar(true)
    } // Update the displayed icon}
    else {
      setSaveIcon(ICONS.unsave);
      setShowSnackBar(false)
    }
  }
};


/**
 * Handles the "like" action on an artwork and updates the UI accordingly.
 * @param {Object} currentUser - The current authenticated user.
 * @param {string} artId - The unique ID of the artwork to be liked.
 * @param {Function} setLikeIcon - Function to update the like icon.
 * @param {Function} setLikesCount - Function to update the likes count.
 * @param {Function} setShowSnackBar - Function to control the visibility of the snack bar.
 * @returns {Promise<void>} Resolves after the like action and UI update.
 */
export const handleLikeClick = async (
  currentUser,
  artId,
  setLikeIcon,
  setLikesCount,
  setShowSnackBar,
) => {
  if (currentUser) {
    await addToLikedActivity(currentUser, artId, "Like");

    const isFavourite = await isArtworkLiked(currentUser, artId);

    if (isFavourite) {
      setLikeIcon(ICONS.liked);
      setLikesCount((prevLikesCount) => prevLikesCount + 1);
      setShowSnackBar(true);
    } // Update the displayed icon}
    else {
      setLikeIcon(ICONS.unliked);
      setLikesCount((prevLikesCount) => prevLikesCount - 1);
      setShowSnackBar(false);
    }
  } 
};
