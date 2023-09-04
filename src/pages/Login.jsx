import React from "react";
import Popup from "../components/Popup";

function Login({ loginPopup, setLoginPopup }) {
  return <Popup loginPopup={loginPopup} setLoginPopup={setLoginPopup} />;
}

export default Login;
