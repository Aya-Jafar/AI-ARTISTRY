import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

function LoginBtn({ path, action, text, id, setLoginPopup, loginPopup }) {
  const ref = useRef(null);

  // Close the popup when clicking outside
  useClickOutside(ref, loginPopup, () => {
    setLoginPopup(false);
  });

  return (
    <Link to={path}>
      <button className="btn" id={id} onClick={action} ref={ref}>
        {text}
      </button>
    </Link>
  );
}
export default LoginBtn;
