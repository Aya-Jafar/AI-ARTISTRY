import { formatDate } from "../../utils/formaters";
import { Heart } from "lucide-react";

function LikeActivity({ index, userName, artData, time, artworkData }) {
  // console.log(artData);
  return (
    <div className="activty-item" key={index}>
      <img src={artData && artData.image} alt="" id="activity-image" />
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
