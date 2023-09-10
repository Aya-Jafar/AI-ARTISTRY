import React, {  createContext, useState } from "react";

const TabContext = createContext();

export function TabContentProvider({ children }) {
  const [currentTab, setCurrentTab] = useState("All");
  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
}

export default TabContext;