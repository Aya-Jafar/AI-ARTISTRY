import React, { useEffect,useState } from "react";
import { getUserInfo } from "../../backend/data";

function CommentImage({ comment }) {
  const [profileImag, setProfileImage] = useState(null);

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
