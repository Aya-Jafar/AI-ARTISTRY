import React, {  createContext, useState } from "react";

/**
 * @description
 * The TabContext provides state management for the currently active tab. 
 * It allows child components to access and modify the active tab state, 
 * enabling dynamic content rendering based on the selected tab.
 */
const TabContext = createContext();

/**
 * @description
 * The TabContentProvider component manages the state for the active tab using 
 * React's `useState`. It wraps child components and provides access to 
 * the current tab state and a function to update it.
 * @component
 * @returns {JSX.Element} The context provider wrapping the children components.
 */
export function TabContentProvider({ children }) {
  const [currentTab, setCurrentTab] = useState("All");
  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
}

export default TabContext;