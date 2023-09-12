import React, { useContext, useEffect } from "react";
import Popup from "../components/Popup";
import AuthPopupContext from "../providers/AuthPopup";

function Login() {
  const { loginPopup, setLoginPopup } = useContext(AuthPopupContext);

  useEffect(()=>{
    setLoginPopup(true)
  },[])

  return <Popup />;
}

export default Login;
