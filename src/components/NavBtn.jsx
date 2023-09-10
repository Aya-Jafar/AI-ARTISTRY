import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import AuthContext from "../providers/Auth";

function NavBtn({ path, action, text, id, popup, setPopup }) {
  const ref = useRef(null);

  // Close the popup when clicking outside
  useClickOutside(ref, popup, () => {
    // console.log(popup);
     setPopup(false);
  });

  return (
    <Link to={path}>
      <button className="btn" id={id} onClick={action} ref={ref}>
        {text}
      </button>
    </Link>
  );
}
export default NavBtn;
