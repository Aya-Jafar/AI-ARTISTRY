import {
  isArtworkSaved,
  isArtworkLiked,
  saveArtwork,
  addToLikedActivity,
} from "./data";

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
      setSaveIcon("/bookmark.png");
      setShowSnackBar(true)
    } // Update the displayed icon}
    else {
      setSaveIcon("/save-instagram (1).png");
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
      setLikeIcon("/heart (4).png");
      setLikesCount((prevLikesCount) => prevLikesCount + 1);
      setShowSnackBar(true)
    } // Update the displayed icon}
    else {
      setLikeIcon("/heart (3).png");
      setLikesCount((prevLikesCount) => prevLikesCount - 1);
      setShowSnackBar(false)
    }
  } else {
    navigate("/login");
  }
};
