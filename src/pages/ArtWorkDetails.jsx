import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtworkDetails } from "../backend/data";
import { motion } from "framer-motion";
import AuthContext from "../providers/Auth";
import { saveArtwork } from "../backend/data";
import AuthPopupContext from "../providers/AuthPopup";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { loginPopup, setLoginPopup } = useContext(AuthPopupContext);

  const navigate = useNavigate();

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
                  <button className="btn" id="like-btn">
                    Like
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      if (currentUser) {
                        saveArtwork(currentUser, id);
                      } else {
                        // setLoginPopup(true)
                        navigate("/login");
                        // if (currentUser) {
                        //   navigate(`/artwork/${id}`);
                        // }
                      }
                    }}
                  >
                    Save
                  </button>
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
