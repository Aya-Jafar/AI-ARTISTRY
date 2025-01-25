import React, { createContext, useState } from "react";

// Creating a Context to handle alert visibility
const AlertContext = createContext();


/**
 * @description
 * The AlertProvider component manages the state of the snackbar alert.
 * - It holds a boolean state `showSnackBar` to control the visibility of the snackbar.
 * - Provides the context with `showSnackBar` and `setShowSnackBar` to allow other components
 *   to read or modify the alert's visibility state.
 * @component
 * @returns {JSX.Element} The context provider with the wrapped children.
 */
export function AlertProvider({ children }) {
  const [showSnackBar, setShowSnackBar] = useState(false);

  return (
    <AlertContext.Provider value={{ showSnackBar, setShowSnackBar }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
