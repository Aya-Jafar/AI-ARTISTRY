import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

function SignupBtn({ path, action, text, id, signupPopup, setSignupPopup }) {
  const ref = useRef(null);

  //   console.log(text, signupPopup);
  console.log(signupPopup);

  // Close the popup when clicking outside
  useClickOutside(ref, signupPopup, () => {
    setSignupPopup(false);
  });

  return (
    <Link to={path}>
      <button className="btn" id={id} onClick={action} ref={ref}>
        {text}
      </button>
    </Link>
  );
}
export default SignupBtn;
