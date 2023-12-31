import React, { createContext, useState } from "react";

const ProfileTabContext = createContext();

export function ProfileTabProvider({ children }) {
  const [currentProfileTab, setProfileTab] = useState("Activity");
  return (
    <ProfileTabContext.Provider value={{ currentProfileTab, setProfileTab }}>
      {children}
    </ProfileTabContext.Provider>
  );
}

export default ProfileTabContext;
