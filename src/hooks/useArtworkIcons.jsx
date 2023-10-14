import { useState, useEffect } from "react";
import { isArtworkSaved,isArtworkLiked } from "../backend/data";

import filledSaved from "../images/bookmark.png";
import filledHeart from "../images/heart (4).png";
import saveIconPic from "../images/save-instagram (1).png";
import heartIcon from "../images/heart (3).png";

const useArtworkIcons = (currentUser, artId) => {
  const [saveIcon, setSaveIcon] = useState(saveIconPic);
  const [likeIcon, setLikeIcon] = useState(heartIcon);

  useEffect(() => {
    const loadIcons = async () => {
      const isSaved = await isArtworkSaved(currentUser, artId);
      const isFavourite = await isArtworkLiked(currentUser, artId);

      // Update the local state based on localStorage
      if (isSaved) {
        setSaveIcon(filledSaved);
      }

      if (isFavourite) {
        setLikeIcon(filledHeart);
      }
    };

    loadIcons();
  }, [currentUser, artId]);

  return { saveIcon, likeIcon, setSaveIcon, setLikeIcon };
};

export default useArtworkIcons;
