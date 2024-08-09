import React from "react";
import CommentActivity from "./CommentActivity";
import LikeActivity from "./LikeActivty";

function UserActivity({ activities }) {
  return (
    activities && (
      <div className="activity">
        {activities?.map((activity, index) => {
          return activity.activityType === "Like" ? (
            <LikeActivity
              index={index}
              artworkData={activity.artData}
              userName={activity.userName}
              artData={activity.artData}
              time={activity.timestamp}
            />
          ) : (
            <CommentActivity
              index={index}
              artworkData={activity.artData}
              commentText={activity.commentText}
              userName={activity.userName}
              artData={activity.artData}
              time={activity.timestamp}
            />
          );
        })}
      </div>
    )
  );
}

export default UserActivity;
