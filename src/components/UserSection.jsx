import AuthContext from "../providers/Auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";


export default function UserSection(currentUser) {

  return (
    <>
      <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>
        <div className="nav-link">{currentUser.displayName}</div>
      </Link>
    </>
  );
}
