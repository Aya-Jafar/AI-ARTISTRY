import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * @description
 * The `useClickOutside` hook detects clicks outside of a specified `ref` and executes
 * the provided `onClickOutside` function when a click outside is detected. If a click
 * is detected outside of the popup, the hook also navigates the user to the home page
 * ("/").
 *
 * The hook listens for click events and ensures that certain elements like buttons or
 * form inputs are excluded from the outside click detection (using `event.target.id`).
 *
 * @param {Object} ref - The reference to the popup element that should trigger the click outside detection.
 * @param {boolean} showPopup - Whether the popup is currently visible. If false, the click outside detection is inactive.
 * @param {Function} onClickOutside - The function to be executed when a click outside is detected.
 */
function useClickOutside(ref, showPopup, onClickOutside) {
  /**
   * @effect
   * @description
   * This effect listens for `click` events on the document. If the click occurs outside
   * the referenced `ref` element and the popup is visible, the `onClickOutside` function
   * is triggered, and the user is redirected to the home page ("/").
   *
   * - Excludes clicks on specific elements (e.g., form inputs and buttons) from triggering the outside click event.
   * - Cleanup is performed on component unmount to avoid memory leaks.
   *
   * @dependencies [ref, onClickOutside, showPopup]
   */
  useEffect(() => {
    const handleClick = (event) => {
      const excludedIds = [
        "gmail-btn",
        "email",
        "password",
        "login-btn",
        "username",
        "signup-btn",
        "signup-from-login",
        "login",
        "sign-up",
        "like-btn",
        "save-btn",
        "artwork-detail-btns",
        "imagine-custome-btns",
      ];
      const excludedClasses = [
        "artwork-detail-btn",
        "shake",
        "artwork-detail-btn shake",
        "icon-img-btn",
        "btn",
        ""
      ];
      
      // Check if the clicked element has an excluded class
      const hasExcludedClass = excludedClasses.some((className) =>
        event.target.classList.contains(className)
      );

      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        showPopup &&
        !excludedIds.includes(event.target.id) &&
        !hasExcludedClass
      ) {
        onClickOutside();
      }
    };
    // The event.target is anything is clicked outsite of the popup
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, onClickOutside, showPopup]);
}

export default useClickOutside;
