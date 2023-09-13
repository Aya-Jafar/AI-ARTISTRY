import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtworkDetails } from "../backend/data";
import { motion } from "framer-motion";
import AuthContext from "../providers/Auth";
import { saveArtwork } from "../backend/data";
import AuthPopupContext from "../providers/AuthPopup";
import saveIcon from "../images/save-instagram (1).png";
import heartIcon from "../images/heart (3).png";
import ArtworkDetailBtn from "../components/ArtworkDetailBtn";
import filledSaved from "../images/bookmark.png";
import filledHeart from "../images/heart (4).png";
import {
  isArtworkSaved,
  addToLikedArtworks,
  isArtworkLiked,
} from "../backend/data";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [currentArtwork, setCurrentArtwork] = useState(null);

  // Fetch the artwork details using the "id" parameter
  useEffect(() => {
    getArtworkDetails(id, setCurrentArtwork);
  }, [id]);


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="artwork-detail"
      >
        <>
          {currentArtwork && (
            <>
              <motion.img
                src={currentArtwork.image}
                alt=""
                className="artwork-detail-img"
                style={{ width: "60%" }}
              />
              <motion.div className="artwork-info">
                <motion.h1>{currentArtwork.model}</motion.h1>
                <motion.h3>{currentArtwork.prompt}</motion.h3>
                <motion.p>Prompt was created by Aya</motion.p>
                <br />
                <div className="artwork-detail-btns">
                  <ArtworkDetailBtn
                    text="Like"
                    artId={id}
                    id="like-btn"
                  />
                  <ArtworkDetailBtn
                    text="Save"
                    artId={id}
                    id="save-btn"
                  />
                </div>
              </motion.div>
            </>
          )}
        </>
      </motion.div>
    </>
  );
};

export default ArtworkDetail;
