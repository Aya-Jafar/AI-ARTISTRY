import React, { useContext, useEffect } from "react";
import Popup from "../components/Popup";
import AuthPopupContext from "../providers/AuthPopup";

function SignUp() {
  const { signupPopup, setSignupPopup } = useContext(AuthPopupContext);

  useEffect(() => {
    setSignupPopup(true);
  }, []);

  return <Popup  />;
}

export default SignUp;
