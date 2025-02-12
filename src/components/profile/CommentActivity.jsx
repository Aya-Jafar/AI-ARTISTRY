import { formatDate } from "../../utils/formaters";
import { MessageSquareText } from 'lucide-react';

/**
 * @component
 * @description
 * The `CommentActivity` component displays a user's comment activity, showing the artwork they commented on, 
 * the comment text, and the time the comment was made. It also displays the username and the creator of the artwork.
 * 
 * @param {number} index - The index of the activity, used as a key for rendering.
 * @param {string} commentText - The text of the comment made by the user.
 * @param {string} userName - The username of the user who commented.
 * @param {object} artData - The data related to the artwork involved in the comment activity.
 *   - `artData.image` (string): The image URL of the artwork.
 * @param {string} time - The timestamp when the comment was made, used to display the time of the comment.
 * @param {object} artworkData - The data related to the artwork being commented on.
 *   - `artworkData.creator` (string): The name of the creator of the artwork.
 * 
 * @example
 * <CommentActivity
 *   index={0}
 *   commentText="This is amazing!"
 *   userName="User123"
 *   artData={{ image: "https://example.com/art.jpg" }}
 *   time="2025-01-25T10:00:00Z"
 *   artworkData={{ creator: "ArtistXYZ" }}
 * />
 */
function CommentActivity({
  index,
  commentText,
  userName,
  artData,
  time,
  artworkData,
}) {
  return (
    <div className="activty-item comment" key={index}>
      <img
        src={artData && artData.image}
        alt=""
        id="activity-image"
        loading="lazy"
      />

      <div className="comment-detail">
        <h4 className="icon-title">
          <MessageSquareText size={35} />
          {userName} commented on {artworkData?.creator}'s post
        </h4>

        <h4 id="comment-text">"{commentText}"</h4>
        {time && (
          <>
            <p>{formatDate(time)[0]}</p>
            <p id="hour">{formatDate(time)[1]}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CommentActivity;
