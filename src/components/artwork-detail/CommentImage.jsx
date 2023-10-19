import React, { useEffect,useState } from "react";
import { getUserInfo } from "../../backend/data";
import miniProfile from "../../images/profile-user.png";

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
            src={profileImag !== null ? profileImag : miniProfile}
            alt=""
            className="profile-image"
          />
        )}
      </div>
    </>
  );
}

export default CommentImage;
