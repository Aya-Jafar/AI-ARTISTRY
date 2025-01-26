import React from "react";

/**
 * @component
 * @description
 * The `CloseButton` component is used to close a popup and navigate to the home page ("/").
 * - It includes an icon (a close button) which, when clicked, triggers two actions:
 *   1. Closes the popup by setting the `setPopup` state to `false`.
 *   2. Navigates the user to the home page using the `useNavigate` hook from React Router.
 * 
 * @param {function} setPopup - A state setter function used to close the popup by setting it to `false`.
 * 
 * @example
 * // Renders a close button that closes the popup and navigates to the home page
 * <CloseButton setPopup={setPopupState} />
 */
function CloseButton({ setPopup }) {

  return (
    <div
      className="close-btn"
      onClick={() => {
        setPopup(false);
      }}
    >
      <img src={"/close.png"} alt="" />
    </div>
  );
}

export default CloseButton;
