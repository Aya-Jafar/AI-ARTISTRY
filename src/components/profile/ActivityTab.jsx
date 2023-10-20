import React from "react";
import CommentActivity from "./CommentActivity";
import LikeActivity from "./LikeActivty";

function UserActivity({ activities }) {
//   const sortedActivities = activities.sort(
//     (a, b) => a.timestamp - b.timestamp
//   );

//   console.log("Reversed activities array:", sortedActivities);


  return (
    activities && (
      <div className="activity">
        {activities.map((activity, index) => {
          return activity.activityType === "Like" ? (
            <LikeActivity
              index={index}
              userName={activity.userName}
              artData={activity.artData}
              time={activity.timestamp}
            />
          ) : (
            <CommentActivity
              index={index}
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
