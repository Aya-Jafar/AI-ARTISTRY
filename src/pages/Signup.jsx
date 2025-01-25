import React, { useContext, useEffect } from "react";
import Popup from "../components/home/cover-section/Popup";
import AuthPopupContext from "../providers/AuthPopup";

/**
 * @component SignUp
 * @description
 * This component handles the signup functionality of the application. It uses the `AuthPopupContext` to manage the
 * state of the signup popup. The `useEffect` hook ensures that when the component is rendered, the signup popup is triggered.
 * The `Popup` component is used to display the signup modal to the user.
 *
 * @example
 * // Example usage of SignUp component
 * <SignUp />
 */
function SignUp() {
  const { signupPopup, setSignupPopup } = useContext(AuthPopupContext);

  useEffect(() => {
    setSignupPopup(true);
  }, [signupPopup]);

  return <Popup />;
}

export default SignUp;
