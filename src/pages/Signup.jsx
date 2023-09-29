import React, { useContext, useEffect } from "react";
import Popup from "../components/home/cover-section/Popup";
import AuthPopupContext from "../providers/AuthPopup";

function SignUp() {
  const { signupPopup, setSignupPopup } = useContext(AuthPopupContext);

  useEffect(() => {
    setSignupPopup(true);
  }, [signupPopup]);

  return <Popup />;
}

export default SignUp;
