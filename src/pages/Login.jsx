import React, { useContext, useEffect } from "react";
import Popup from "../components/home/cover-section/Popup";
import AuthPopupContext from "../providers/AuthPopup";

function Login() {
  const { loginPopup, setLoginPopup } = useContext(AuthPopupContext);

  useEffect(() => {
    setLoginPopup(true);
  }, [loginPopup]);

  return <Popup />;
}

export default Login;
