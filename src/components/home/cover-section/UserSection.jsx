import AuthContext from "../../../providers/Auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { linkStyles } from "../../../utils/formaters";

/**
 * @component
 * @description
 * The `UserSection` component displays the logged-in user's profile link. If a user is logged in,
 * it renders a link to the user's profile, displaying the user's display name.
 *
 * @example
 * <UserSection />
 *
 */
export default function UserSection() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser && (
        <Link to={`/profile/${currentUser.uid}`} style={{ ...linkStyles }}>
          <div className="nav-link">
            {currentUser.displayName.toUpperCase()}
          </div>
        </Link>
      )}
    </>
  );
}
