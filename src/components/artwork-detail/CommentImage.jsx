import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../backend/data";

/**
 * @description
 * The CommentImage component is responsible for displaying the profile image of the user who made a comment.
 * It fetches the user's profile image based on the userId from the comment data and displays it.
 * If no profile image is found, it shows a default image.
 * The component uses the `getUserInfo` function to retrieve the user's information and update the state.
 */
function CommentImage({ comment }) {
  const [profileImag, setProfileImage] = useState(null);

  /**
   * @effect
   * @description
   * The effect runs when the `comment.userId` prop changes.
   * It fetches the user's profile image by calling the `getUserInfo` function,
   * and updates the `profileImag` state with the retrieved image.
   * If the user's image is not available, the default `/profile-user.png` is shown.
   * @dependencies [comment.userId]
   */
  useEffect(() => {
    getUserInfo(comment.userId).then((result) => setProfileImage(result.image));
  });

  return (
    <>
      <div className="mini-profile-img">
        {comment.userId && (
          <img
            src={profileImag !== null ? profileImag : "/profile-user.png"}
            alt=""
            className="profile-image comment"
          />
        )}
      </div>
    </>
  );
}

export default CommentImage;
