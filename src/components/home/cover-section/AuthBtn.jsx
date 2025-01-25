import React from "react";

/**
 * @component
 * @description
 * The `AuthBtn` component renders a button with an icon and text. 
 * It is typically used for authentication actions such as signing up or logging in.
 * - The `icon` prop is used to display an image (e.g., a Google login icon).
 * - The `text` prop specifies the text to be displayed next to the icon.
 * - The `onClick` prop is a function that is called when the button is clicked.
 * - The `id` prop allows you to specify a unique ID for the button element.
 * 
 * @param {string} icon - The source URL for the icon image displayed on the button.
 * @param {function} onClick - The function to be executed when the button is clicked.
 * @param {string} text - The text displayed on the button.
 * @param {string} id - The unique ID for the button element (optional).
 * 
 * @example
 * // Renders a button with a Google icon, text "Sign up with Google" and an onClick handler
 * <AuthBtn icon="/google-icon.png" onClick={handleGoogleSignup} text="Sign up with Google" id="google-signup" />
 */
function AuthBtn({ icon, onClick, text, id }) {
  return (
    <button className="signup-btns" id={id} onClick={onClick}>
      <div>
        <img src={icon} alt="" className="auth-icon" />
      </div>
      {text}
    </button>
  );
}


export default AuthBtn;
