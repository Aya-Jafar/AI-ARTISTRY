import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArtworkDetails, getPosts } from "../backend/data";
import { motion } from "framer-motion";
import ArtworkDetailBtn from "../components/artwork-detail/ArtworkDetailBtn";
import { getGeneratedArtworkDetails } from "../backend/data";
import AuthContext from "../providers/Auth";
import CommentInput from "../components/artwork-detail/CommentInput";
import CounterItem from "../components/artwork-detail/CounterItem";
import AllComments from "../components/artwork-detail/AllComments";
import CustomAlert from "../components/common/CustomAlert";
import AlertContext from "../providers/Alert";
import { infoStyle } from "../utils/formaters";
import { Heart, MessageSquareText } from "lucide-react";
import AuthPopupContext from "../providers/AuthPopup";

/**
 * @description
 * The `ArtworkDetail` component is responsible for displaying detailed information about an artwork.
 * It handles both generated and non-generated artworks and provides functionality for displaying
 * artwork details such as the image, likes, comments, and user interactions.
 *
 * Depending on the type of artwork (generated by the user or not), it fetches the necessary data
 * either by using the artwork ID or by decoding a generated image URL. The component supports the
 * display of comments, likes, and allows for user interactions like commenting on the artwork.
 *
 * The component uses context hooks for managing user authentication and displaying feedback messages (snack bars).
 * It also maintains local state variables for storing artwork data, comments, and counts for likes and comments.
 */
const ArtworkDetail = ({ isGeneratedArtwork = false, label = "" }) => {
  /**
   * @description
   * This section of the ArtworkDetail component contains state variables and context hooks
   * that manage the artwork details, comments, and likes:
   * - `currentUser` from `AuthContext` provides the authentication data for the logged-in user.
   * - `currentArtwork` state stores the details of the artwork, including its image and metadata.
   * - `likesCount` state stores the count of likes for the artwork.
   * - `commentsCount` state stores the count of comments for the artwork.
   * - `allComments` state stores the list of comments for the artwork.
   * - `currentComment` state holds the comment text currently being typed by the user.
   * - `showSnackBar` from `AlertContext` provides feedback messages (snack bars) to the user.
   **/
  const { id, generatedImageUrl, postUrl } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const { showSnackBar } = useContext(AlertContext);
  const { loginPopup, signupPopup, setLoginPopup } =
    useContext(AuthPopupContext);
  const isBlured = loginPopup || signupPopup;

  /**
   * @effect
   * @description
   * Fetches the artwork details based on the `isGeneratedArtwork` flag and the provided `id` or `postUrl`.
   * - If the artwork is not generated by the user, it fetches the details using the artwork ID.
   * - If the artwork is generated by the user, it fetches the details using the URL (decoded) and the `label`.
   * @dependencies [id, generatedImageUrl, currentArtwork, allComments]
   */
  useEffect(() => {
    // if it's not generated artwork then get it's data by it's id
    if (!isGeneratedArtwork) {
      getArtworkDetails(
        id,
        setCurrentArtwork,
        setLikesCount,
        setCommentsCount,
        setAllComments
      );
    } else {
      // if it's generated by the user, get it's data by it's decoded URL
      if (label === "posts") {
        getGeneratedArtworkDetails(
          currentUser,
          setCurrentArtwork,
          decodeURIComponent(postUrl),
          label
        );
      }
      if (label === "saved-generated") {
        getGeneratedArtworkDetails(
          currentUser,
          setCurrentArtwork,
          decodeURIComponent(generatedImageUrl),
          label
        );
      }
    }
  }, [id, generatedImageUrl, currentArtwork, allComments]);

  /**
   * @function imageMaker
   * @description
   * Returns the correct image URL based on the artwork type (generated or posted).
   * - If the artwork has an `id`, it uses the `currentArtwork.image` URL.
   * - If the artwork has a `generatedImageUrl`, it returns that.
   * - Otherwise, it returns the `postUrl` for the artwork.
   * @returns {string} The image URL of the artwork.
   */
  const imageMaker = () => {
    if (id) {
      return currentArtwork.image;
    }
    if (currentArtwork.generatedImageUrl) {
      return currentArtwork.generatedImageUrl;
    } else {
      return currentArtwork.postUrl;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`artwork-detail ${isBlured ? "blur-background" : ""}`}
      >
        <>
          {currentArtwork && (
            <>
              <motion.img
                loading="lazy"
                src={imageMaker()}
                alt=""
                className="artwork-detail-img"
                style={{
                  filter: `brightness(${currentArtwork.brightness}%) contrast(${currentArtwork.contrast}%)`,
                }}
              />
              <motion.div
                className="artwork-info"
                style={infoStyle(currentArtwork.prompt)}
              >
                {showSnackBar && (
                  <CustomAlert message="Artwork added successfully" />
                )}

                {currentArtwork.model ? (
                  <motion.h1>{currentArtwork.model}</motion.h1>
                ) : (
                  <motion.h1>Art diffusion</motion.h1>
                )}

                <motion.h3 className="prompt-text">
                  {currentArtwork.prompt}
                </motion.h3>

                {currentArtwork.creator ? (
                  <motion.p>{`Prompt was created by ${currentArtwork.creator}`}</motion.p>
                ) : (
                  <motion.p>unknown prompt creator</motion.p>
                )}

                <br />
                <div className="artwork-detail-btns" id="artwork-detail-btns">
                  <ArtworkDetailBtn
                    text="Like"
                    artId={id}
                    id="like-btn"
                    setLikesCount={setLikesCount}
                  />
                  <ArtworkDetailBtn text="Save" artId={id} id="save-btn" />
                </div>

                <div className="likes-comments-count">
                  <CounterItem counterIcon={Heart} countesNumber={likesCount} />
                  <CounterItem
                    counterIcon={MessageSquareText}
                    countesNumber={commentsCount}
                  />
                </div>

                <CommentInput
                  artId={id}
                  setCurrentComment={setCurrentComment}
                  currentComment={currentComment}
                />
                <AllComments comments={allComments} artId={id} />
              </motion.div>
            </>
          )}
        </>
      </motion.div>
    </>
  );
};

export default ArtworkDetail;
