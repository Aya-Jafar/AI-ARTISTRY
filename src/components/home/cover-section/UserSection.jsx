import AuthContext from "../../../providers/Auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { linkStyles } from "../../../utils/formaters";

export default function UserSection() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser && currentUser.displayName && (
        <Link to={`/profile/${currentUser.uid}`} style={{ ...linkStyles }}>
          <div className="nav-link">
            {currentUser.displayName.toUpperCase()}
          </div>
        </Link>
      )}
    </>
  );
}
