import React, { createContext, useState } from "react";

/**
 * @description
 * The AuthPopupContext provides state management for the visibility of
 * authentication-related popups (login and signup). It allows child 
 * components to access and control the display of login and signup forms.
 */
const AuthPopupContext = createContext();


/**
 * @description
 * The AuthPopupProvider component manages the visibility of the login and 
 * signup popups using React's state. It provides context to control the 
 * state of these popups, enabling other components to open/close them as needed.
 * @component
 * @returns {JSX.Element} The context provider wrapping children components.
 */
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
