import React, { useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import AuthPopupContext from "../../../providers/AuthPopup";


function NavBtn({ path, text, id }) {
  const { loginPopup, signupPopup, setLoginPopup, setSignupPopup } =
    useContext(AuthPopupContext);

  const ref = useRef(null);
  let popup = path === "/login" ? loginPopup : signupPopup;

  // Close the popup when clicking outside
  useClickOutside(ref, popup, () => {
    path === "/login" ? setLoginPopup(false) : setSignupPopup(false);
  });

  return (
    <Link to={path}>
      <button className="btn" id={id} ref={ref}>
        {text}
      </button>
    </Link>
  );
}
export default NavBtn;
