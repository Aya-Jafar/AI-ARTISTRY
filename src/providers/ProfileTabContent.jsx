import React, { createContext, useState } from "react";

/**
 * @description
 * The ProfileTabContext provides state management for the current active 
 * profile tab. It allows child components to access and modify the active 
 * tab state, enabling seamless tab switching functionality in the profile section.
 */
const ProfileTabContext = createContext();

/**
 * @description
 * The ProfileTabProvider component manages the active profile tab's state 
 * using React's `useState`. It provides the context to child components 
 * allowing them to read and update the selected profile tab.
 * @component
 * @returns {JSX.Element} The context provider wrapping the children components.
 */
export function ProfileTabProvider({ children }) {
  const [currentProfileTab, setProfileTab] = useState("Activity");
  return (
    <ProfileTabContext.Provider value={{ currentProfileTab, setProfileTab }}>
      {children}
    </ProfileTabContext.Provider>
  );
}

export default ProfileTabContext;
