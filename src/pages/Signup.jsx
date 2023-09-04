import React from "react";
import Popup from "../components/Popup";

function SignUp({ signupPopup, setSignupPopup }) {
  return <Popup signupPopup={signupPopup} setSignupPopup={setSignupPopup} />;
}

export default SignUp;
