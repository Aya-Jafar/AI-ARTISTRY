import React, { createContext, useState } from "react";

const AuthPopupContext = createContext();

export function AuthPopupProvider({ children }) {
  const [loginPopup, setLoginPopup] = useState(false);
  const [signupPopup, setSignupPopup] = useState(false);

  return (
    <AuthPopupContext.Provider
      value={{ loginPopup, setLoginPopup, signupPopup, setSignupPopup }}
    >
      {children}
    </AuthPopupContext.Provider>
  );
}

export default AuthPopupContext;
