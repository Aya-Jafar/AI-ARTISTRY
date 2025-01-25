import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import AuthPopupContext from "../../../providers/AuthPopup";

/**
 * @component
 * @description
 * The `NavButton` component represents a navigation button used in the navigation bar.
 * - It is used for rendering login, signup, and other navigation links.
 * - It displays a button and closes any active popups (login/signup) when clicking outside of the button.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.path - The path the button should link to.
 * @param {string} props.text - The text to be displayed inside the button.
 * @param {string} props.id - The ID to be assigned to the button.
 *
 * @example
 * <NavButton path="/signup" text="SIGN UP" id="sign-up" />
 */
function NavButton({ path, text, id }) {
  /**
   * @description
   * This section manages the popups for login and signup and handles the click outside functionality.
   */
  const { loginPopup, signupPopup, setLoginPopup, setSignupPopup } =
    useContext(AuthPopupContext);

  const ref = useRef(null);
  let popup = path === "/login" ? loginPopup : signupPopup;

  /**
   * @hook useClickOutside
   * @description
   * Custom hook to close the popup when clicking outside the button.
   * - Listens for outside clicks and closes the respective popup based on the path.
   */
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
export default NavButton;
