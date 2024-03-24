import { formatDate } from "../../utils/formaters";
import likeIcon from "../../images/love (2).png";
import { Link } from "react-router-dom";

function LikeActivity({ index, userName, artData, time }) {
  return (
    <div className="activty-item" key={index}>
      <img src={artData && artData.image} alt="" id="activity-image"/>
      <div className="comment-detail">
        <h4 className="icon-title">
          {/* <Link to={`/artwork/${artData.id}`}> */}
            <img src={likeIcon} alt="" />
          {/* </Link> */}
          {userName} liked {`Aya`}'s post
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
