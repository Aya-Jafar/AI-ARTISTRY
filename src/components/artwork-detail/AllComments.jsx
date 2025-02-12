import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkStyles } from "../../utils/formaters";
import { motion } from "framer-motion";
import { slideAnimation } from "../../utils/motion";
import AuthContext from "../../providers/Auth";
import { deleteComment, editComment } from "../../backend/data";
import { getUserInfo } from "../../backend/data";
import CommentImage from "./CommentImage";
import { Trash, Pencil } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../backend/firebaseConfig";
import {
  FIREBASE_COMMENTS_COLLECTION,
  FIREBASE_MAIN_COLLECTION,
} from "../../utils/constants";

/**
 * @description
 * The AllComments component displays a list of comments for a specific artwork.
 * It provides users with the ability to edit or delete their own comments.
 * The component integrates with the user authentication context, allowing only the current user
 * to modify or remove their own comments. The component uses state management for toggling comment options,
 * tracking the active comment being edited, and handling user interactions such as editing and deleting.
 */
function AllComments({ comments, artId, setAllComments }) {
  /**
   * @description
   * This section of the AllComments component contains state variables, context hooks,
   * and core functionality for handling user interactions, comment management, and UI updates.
   **/
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [editCommentId, setEditCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  /**
   * @effect useEffect
   * @description
   * Listens for real-time updates to comments in the Firestore database for a specific artwork.
   * When a change occurs (new comment, edit, or deletion), the state is updated with the latest comments.
   *
   * @dependencies [,artId]
   *
   * @returns {Function} Cleanup function to unsubscribe from Firestore listener when the component unmounts or `artId` changes.
   */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(
        db,
        FIREBASE_MAIN_COLLECTION,
        artId,
        FIREBASE_COMMENTS_COLLECTION
      ),
      (snapshot) => {
        setAllComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
    return () => unsubscribe();
  }, [comments, artId]);

  /**
   * @effect
   * @description
   * Fetches user information for the first comment's userId when comments change.
   * The user information is used to display the comment author's profile link.
   * @dependencies [comments]
   */
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
                <CommentImage comment={comment} />

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
                          loading="lazy"
                          src={"/more.png"}
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
                              <Pencil size={20} />
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
                              <Trash size={20} />
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
