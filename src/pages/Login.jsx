import React, { useContext, useEffect } from "react";
import Popup from "../components/home/cover-section/Popup";
import AuthPopupContext from "../providers/AuthPopup";

/**
 * @component Login
 * @description
 * This component is responsible for handling the login popup. It triggers the popup to be shown as soon as the component
 * mounts by setting the `loginPopup` state to `true` through the `AuthPopupContext`. The actual popup content is rendered 
 * by the `Popup` component.
 *   
 * @example
 * // Example usage of Login component
 * <Login />
 */

function Login() {
  const { loginPopup, setLoginPopup } = useContext(AuthPopupContext);

  useEffect(() => {
    setLoginPopup(true);
  }, [loginPopup]);

  return <Popup />;
}

export default Login;
