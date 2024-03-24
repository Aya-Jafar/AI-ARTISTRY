import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkStyles } from "../../utils/formaters";
import { motion } from "framer-motion";
import { slideAnimation } from "../../utils/motion";
import moreIcon from "../../images/more.png";
import AuthContext from "../../providers/Auth";
import { deleteComment, editComment } from "../../backend/data";
import deleteIcon from "../../images/trash.png";
import editIcon from "../../images/edit.png";
import { getUserInfo } from "../../backend/data";
import CommentImage from "./CommentImage";

function AllComments({ comments, artId }) {
  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const [editCommentId, setEditCommentId] = useState("");

  const [editedComment, setEditedComment] = useState("");

  const [activeCommentId, setActiveCommentId] = useState(null);

  useEffect(() => {
    getUserInfo(comments[0] && comments[0].userId);
  }, [comments]);

  return (
    <>
      {comments && (
        <div className="comments">
          {comments.map((comment, index) => {
            return (
              <motion.div
                key={index}
                className="one-comment"
                style={{ ...slideAnimation("down") }}
              >
                <CommentImage comment={comment}/>

                <div className="username-comment">
                  <div className="username-settings">
                    <Link
                      to={comment.userId && `/profile/${comment.userId}`}
                      style={{ ...linkStyles }}
                    >
                      <h4>{comment.userName}</h4>
                    </Link>

                    {currentUser && currentUser.uid === comment.userId ? (
                      <div className="edit-comment-icon">
                        <img
                          src={moreIcon}
                          alt=""
                          id="comment-setting"
                          // ref={anchorRef}
                          aria-controls={open ? "composition-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleToggle();
                            activeCommentId === comment.id
                              ? setActiveCommentId(null) // Clear active comment ID if already set
                              : setActiveCommentId(comment.id); // Set active comment ID
                          }}
                        />

                        {activeCommentId === comment.id && ( // Display buttons for the active comment
                          <div className="comment-edit-menu">
                            <div
                              className="edit-option"
                              onClick={() => {
                                setEditCommentId(comment.id);
                                setEditedComment(comment.text);
                              }}
                            >
                              <img src={editIcon} alt="" />
                              Edit
                            </div>
                            <div
                              className="edit-option"
                              onClick={() =>
                                deleteComment(
                                  artId,
                                  comment.id,
                                  currentUser && currentUser.uid
                                )
                              }
                            >
                              <img src={deleteIcon} alt="" />
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {editCommentId === comment.id ? (
                    <input
                      type="text"
                      className="comment-editor"
                      id="comment-editor"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          editComment(
                            artId,
                            comment.id,
                            currentUser.uid,
                            editedComment
                          );
                          setEditCommentId("");
                          setEditedComment("");
                        }
                      }}
                    />
                  ) : (
                    <h5>{comment.text}</h5>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AllComments;
