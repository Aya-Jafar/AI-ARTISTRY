import { formatDate } from "../../utils/formaters";
import { MessageSquareText } from 'lucide-react';

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
      <img src={artData && artData.image} alt="" id="activity-image" />

      <div className="comment-detail">
        <h4 className="icon-title">
          <MessageSquareText size={35}/>
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
