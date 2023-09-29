import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../providers/Auth";
import { saveToProfile, addToProfileLiked } from "../../backend/services";
import useArtworkIcons from "../../hooks/useArtworkIcons";
import { motion } from "framer-motion";

function ArtworkDetailBtn({ text, artId, id, setLikesCount }) {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const { saveIcon, likeIcon, setSaveIcon, setLikeIcon } = useArtworkIcons(
    currentUser,
    artId
  );

  const [isShaking, setIsShaking] = useState(false);

  const handleButtonClick = async () => {
    if (text === "Save") {
      await saveToProfile(currentUser, artId, setSaveIcon, navigate);
    } else {
      await addToProfileLiked(
        currentUser,
        artId,
        setLikeIcon,
        setLikesCount,
        navigate
      );
    }
    // Trigger the shaking animation
    setIsShaking(true);

    // Reset the animation after a short delay
    setTimeout(() => {
      setIsShaking(false);
    }, 500); // 500 milliseconds
  };

  return (
    <motion.button className="btn" onClick={handleButtonClick} id={id}>
      <motion.div className={`artwork-detail-btn ${isShaking ? "shake" : ""}`}>
        <motion.img
          src={text === "Save" ? saveIcon : likeIcon}
          alt=""
          animate={{ rotate: isShaking ? [0, -10, 10, -10, 10, -10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.span>{text}</motion.span>
      </motion.div>
    </motion.button>
  );
}

export default ArtworkDetailBtn;
