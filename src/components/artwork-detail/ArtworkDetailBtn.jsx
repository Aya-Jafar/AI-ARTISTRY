import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/Auth";
import { saveToProfile, handleLikeClick } from "../../backend/services";
import useArtworkIcons from "../../hooks/useArtworkIcons";
import { motion } from "framer-motion";
import AlertContext from "../../providers/Alert";


/**
 * @description
 * The ArtworkDetailBtn component displays a button for either "Save" or "Like" functionality for an artwork.
 * It allows users to save the artwork to their profile or like it, depending on the button's text.
 * The component handles user interactions with animations, context hooks for authentication and alerts,
 * and provides feedback by updating the UI and showing snack bars.
 * 
 * The component is responsible for:
 * - Handling save and like actions for an artwork.
 * - Triggering button animation effects (shaking).
 * - Displaying the current save/like status with icons.
 * - Managing user authentication state.
 */
function ArtworkDetailBtn({ text, artId, id, setLikesCount }) {
  /**
   * @description
   * This section contains context hooks, state management, and button click handling for the artwork detail buttons.
   **/
  const { currentUser } = useContext(AuthContext);
  const { showSnackBar, setShowSnackBar } = useContext(AlertContext);
  const navigate = useNavigate();
  const { saveIcon, likeIcon, setSaveIcon, setLikeIcon } = useArtworkIcons(
    currentUser,
    artId
  );
  const [isShaking, setIsShaking] = useState(false);

  /**
   * @function handleButtonClick
   * @description
   * Handles the click event for the "Save" or "Like" button.
   * - Executes `saveToProfile` or `handleLikeClick` based on the button text.
   * - Triggers a shake animation for feedback.
   * - Resets the shake animation after a short delay.
   */

  const handleButtonClick = async () => {
    if (text === "Save") {
      await saveToProfile(
        currentUser,
        artId,
        setSaveIcon,
        navigate,
        setShowSnackBar
      );
    } else {
      await handleLikeClick(
        currentUser,
        artId,
        setLikeIcon,
        setLikesCount,
        navigate,
        setShowSnackBar
      );
      // setShowSnackBar(true)
    }
    // Trigger the shaking animation
    setIsShaking(true);

    // Reset the animation after a short delay
    setTimeout(() => {
      setIsShaking(false);
    }, 500); // 500 milliseconds
  };

  return (
    <>
      <motion.button className="btn" onClick={handleButtonClick} id={id}>
        <motion.div
          className={`artwork-detail-btn ${isShaking ? "shake" : ""}`}
        >
          <motion.img
            src={text === "Save" ? saveIcon : likeIcon}
            alt=""
            animate={{ rotate: isShaking ? [0, -10, 10, -10, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.span>{text}</motion.span>
        </motion.div>
      </motion.button>
    </>
  );
}

export default ArtworkDetailBtn;
