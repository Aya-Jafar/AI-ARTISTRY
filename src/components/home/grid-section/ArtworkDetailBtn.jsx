import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../providers/Auth";
import saveIcon from "../../../images/save-instagram (1).png";
import heartIcon from "../../../images/heart (3).png";
import {
  isArtworkSaved,
  addToLikedArtworks,
  isArtworkLiked,
  saveArtwork,
} from "../../../backend/data";
import filledSaved from "../../../images/bookmark.png";
import filledHeart from "../../../images/heart (4).png";



function ArtworkDetailBtn({ text, artId, id }) {
  const { currentUser } = useContext(AuthContext);
  const [defaultSaveIcon, setSaveIcon] = useState(saveIcon);
  const [likeIcon, setLikeIcon] = useState(heartIcon);
  const navigate = useNavigate();

  const addToSaved = async () => {
    if (currentUser) {
      await saveArtwork(currentUser, artId); // Wait for the artwork to be saved
      const isSaved = await isArtworkSaved(currentUser, artId); // Check if it's saved
      if (isSaved) {
        setSaveIcon(filledSaved);
      } // Update the displayed icon}
      else {
        setSaveIcon(saveIcon);
      }
      // localStorage.setItem(`saved_${id}`, isSaved);
    } else {
      navigate("/login");
    }
  };

  const addToLiked = async () => {
    if (currentUser) {
      await addToLikedArtworks(currentUser, artId); // Wait for the artwork to be liked
      const isFavourite = await isArtworkLiked(currentUser, artId); // Check if it's saved
      if (isFavourite) {
        setLikeIcon(filledHeart);
      } // Update the displayed icon}
      else {
        setLikeIcon(heartIcon);
      }
      // localStorage.setItem(`liked_${id}`, isFavourite);
    } else {
      navigate("/login");
    }
  };

  //   const navigate = useNavigate();

  useEffect(() => {
    // Load the appropriate icon when the component mounts
    const loadIcon = async () => {
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

    loadIcon();
  }, [currentUser, saveIcon, likeIcon, artId]);

  return (
    <button
      className="btn"
      onClick={text === "Save" ? addToSaved : addToLiked}
      id={id}
    >
      <div className="artwork-detail-btn">
        <img src={text === "Save" ? defaultSaveIcon : likeIcon} alt="" />
        {text}
      </div>
    </button>
  );
}

export default ArtworkDetailBtn;
