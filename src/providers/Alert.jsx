import React, { createContext, useState } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [showSnackBar, setShowSnackBar] = useState(false);

  return (
    <AlertContext.Provider value={{ showSnackBar, setShowSnackBar }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
