import { formatDate } from "../../utils/formaters";
import { Heart } from "lucide-react";

/**
 * @component
 * @description
 * The `LikeActivity` component displays a user's like activity, showing the artwork they liked,
 * the username of the person who liked it, and the time the like was made. It also displays the creator
 * of the artwork being liked.
 * 
 * @param {number} index - The index of the activity, used as a key for rendering.
 * @param {string} userName - The username of the user who liked the artwork.
 * @param {object} artData - The data related to the artwork that was liked.
 *   - `artData.image` (string): The image URL of the artwork.
 * @param {string} time - The timestamp when the like occurred, used to display the time of the like.
 * @param {object} artworkData - The data related to the artwork being liked.
 *   - `artworkData.creator` (string): The name of the creator of the artwork.
 * 
 * @example
 * <LikeActivity
 *   index={0}
 *   userName="User123"
 *   artData={{ image: "https://example.com/art.jpg" }}
 *   time="2025-01-25T10:00:00Z"
 *   artworkData={{ creator: "ArtistXYZ" }}
 * />
 */
function LikeActivity({ index, userName, artData, time, artworkData }) {
  return (
    <div className="activty-item" key={index}>
      <img
        src={artData && artData.image}
        alt=""
        id="activity-image"
        loading="lazy"
      />
      <div className="comment-detail">
        <h4 className="icon-title">
          <Heart size={30} />
          {userName} liked {artworkData?.creator || "unknown"}'s post
        </h4>

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

export default LikeActivity;
