import React, { useContext, useState } from "react";
import { addCommentToActivity } from "../../backend/data";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../../providers/Auth";
import { isAuthenticated } from "../../backend/auth";
import { useNavigate } from "react-router-dom";
import AuthPopupContext from "../../providers/AuthPopup";

/**
 * @description
 * The CommentInput component allows users to input comments on artwork.
 * It checks if the user is authenticated, and if they are, it allows them to submit comments.
 * The component uses state management to handle the comment input and loading state during submission.
 * It displays a progress indicator while the comment is being added and resets the input field once the comment is submitted.
 */

function CommentInput({ artId, currentComment, setCurrentComment }) {
  const { currentUser } = useContext(AuthContext);
  const [isClicked, setIsClicked] = useState(false);
  const { loginPopup, signupPopup, setLoginPopup } =
    useContext(AuthPopupContext);

  /**
   * @function handleCommentIconClick
   * @description
   * Handles the comment submission when the comment icon is clicked.
   * - Checks if the user is authenticated.
   * - If the user is authenticated and the comment is non-empty, it calls `addCommentToActivity` to submit the comment.
   * - Shows a progress indicator while the comment is being added.
   * - Resets the input field after submission.
   * @param {Event} e - The click event on the comment icon.
   */
  const handleCommentIconClick = () => {
    if (isAuthenticated(currentUser)) {
      if (currentComment.trim().length > 0) {
        setIsClicked(true);
        addCommentToActivity(currentUser, artId, currentComment);
      } else {
        return;
      }
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);

      setCurrentComment("");
    } else {
      setLoginPopup(true);
    }
  };
  /**
   * @function handleKeyPress
   * @description
   * Handles the key press event for the input field.
   * - Submits the comment when the "Enter" key is pressed.
   * @param {KeyboardEvent} e - The key press event.
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent Enter from adding a newline
      handleCommentIconClick();
    }
  };

  return (
    <div className="comment">
      <input
        className="comment-input"
        placeholder="Add your comment here..."
        onChange={(e) => setCurrentComment(e.target.value)}
        onKeyPress={handleKeyPress}
        value={currentComment}
      />
      {isClicked ? (
        <CircularProgress className="comment-progress-indicator" size="35px" />
      ) : (
        <img
          loading="lazy"
          src={"/send.png"}
          alt="Comment Icon"
          className="comment-icon"
          onClick={() => handleCommentIconClick()}
        />
      )}
    </div>
  );
}

export default CommentInput;
