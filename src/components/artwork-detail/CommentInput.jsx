import React, { useContext, useState } from "react";
import postCommentIcon from "../../images/send.png";
import { addComment } from "../../backend/data";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../../providers/Auth";
import { isAuthenticated } from "../../backend/auth";
import { useNavigate } from "react-router-dom";

function CommentInput({ artId }) {
  const [commentInput, setCommentInput] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  // const [timeCommentWasAdded , setTimeCommentWasAdded]= useState(null);

  const handleCommentIconClick = () => {
    setIsClicked(true);
    if (isAuthenticated(currentUser)) {
      if (commentInput.length > 0) {
        addComment(currentUser, artId, commentInput);
        setCommentInput("");
      }
      setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="comment">
      <input
        className="comment-input"
        placeholder="Add your comment here..."
        onChange={(e) => setCommentInput(e.target.value)}
      />
      {isClicked ? (
        <CircularProgress className="comment-progress-indicator" size="35px" />
      ) : (
        <img
          src={postCommentIcon}
          alt="Comment Icon"
          className="comment-icon"
          onClick={handleCommentIconClick}
        />
      )}
    </div>
  );
}

export default CommentInput;
