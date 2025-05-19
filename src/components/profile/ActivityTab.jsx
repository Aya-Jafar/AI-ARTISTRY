import React from "react";
import CommentActivity from "./CommentActivity";
import LikeActivity from "./LikeActivty";

/**
 * @component
 * @description
 * The `UserActivity` component displays a list of user activities, such as likes and comments, 
 * sorted by timestamp in descending order. It renders different activity types using the `LikeActivity`
 * and `CommentActivity` components.
 * 
 * - Each activity is sorted by its timestamp, with the most recent activity appearing first.
 * - If the activity type is "Like", it renders the `LikeActivity` component.
 * - If the activity type is "Comment", it renders the `CommentActivity` component.
 * 
 * @param {Array} activities - A list of activity objects to be displayed. Each activity contains:
 *   - `activityType` (string): The type of activity ("Like" or "Comment").
 *   - `timestamp` (string): The timestamp of the activity.
 *   - `userName` (string): The name of the user who performed the activity.
 *   - `artData` (object): Data related to the artwork involved in the activity.
 *   - `commentText` (string, optional): The text of the comment (only present for comment activities).
 * 
 * @example
 * const activities = [
 *   { activityType: "Like", timestamp: "2025-01-25T10:00:00Z", userName: "User1", artData: {...} },
 *   { activityType: "Comment", timestamp: "2025-01-24T10:00:00Z", userName: "User2", artData: {...}, commentText: "Great art!" }
 * ];
 * <UserActivity activities={activities} />
 */
function UserActivity({ activities }) {
  return (
    activities && (
      <div className="activity">
        {activities
          ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map((activity, index) => {
            return activity.activityType === "Like" ? (
              <LikeActivity
                index={index}
                artworkData={activity.artData}
                userName={activity.userName}
                artData={activity.artData}
                time={activity.timestamp}
                key={index}
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
