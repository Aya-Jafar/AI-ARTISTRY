import {
  isArtworkSaved,
  isArtworkLiked,
  saveArtwork,
  addToLikedActivity,
} from "./data";
import filledSaved from "../images/bookmark.png";
import saveIcon from "../images/save-instagram (1).png";
import filledHeart from "../images/heart (4).png";
import heartIcon from "../images/heart (3).png";

export const saveToProfile = async (
  currentUser,
  artId,
  setSaveIcon,
  navigate,
  setShowSnackBar
) => {
  if (currentUser) {
    await saveArtwork(currentUser, artId); // Wait for the artwork to be saved
    const isSaved = await isArtworkSaved(currentUser, artId); // Check if it's saved
    if (isSaved) {
      setSaveIcon(filledSaved);
      setShowSnackBar(true)
    } // Update the displayed icon}
    else {
      setSaveIcon(saveIcon);
      setShowSnackBar(false)
    }
  } else {
    navigate("/login");
  }
};


export const handleLikeClick = async (
  currentUser,
  artId,
  setLikeIcon,
  setLikesCount,
  navigate,
  setShowSnackBar
) => {
  if (currentUser) {
    await addToLikedActivity(currentUser, artId, "Like");

    const isFavourite = await isArtworkLiked(currentUser, artId);

    if (isFavourite) {
      setLikeIcon(filledHeart);
      setLikesCount((prevLikesCount) => prevLikesCount + 1);
      setShowSnackBar(true)
    } // Update the displayed icon}
    else {
      setLikeIcon(heartIcon);
      setLikesCount((prevLikesCount) => prevLikesCount - 1);
      setShowSnackBar(false)
    }
  } else {
    navigate("/login");
  }
};
