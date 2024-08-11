import { useState, useEffect } from "react";
import { isArtworkSaved,isArtworkLiked } from "../backend/data";

const useArtworkIcons = (currentUser, artId) => {
  const [saveIcon, setSaveIcon] = useState("/save-instagram (1).png");
  const [likeIcon, setLikeIcon] = useState("/heart (3).png");

  useEffect(() => {
    const loadIcons = async () => {
      const isSaved = await isArtworkSaved(currentUser, artId);
      const isFavourite = await isArtworkLiked(currentUser, artId);

      // Update the local state based on localStorage
      if (isSaved) {
        setSaveIcon("/bookmark.png");
      }

      if (isFavourite) {
        setLikeIcon("/heart (4).png");
      }
    };

    loadIcons();
  }, [currentUser, artId]);

  return { saveIcon, likeIcon, setSaveIcon, setLikeIcon };
};

export default useArtworkIcons;
