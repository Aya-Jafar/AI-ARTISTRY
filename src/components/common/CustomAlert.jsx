import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertContext from "../../providers/Alert";


/**
 * @description
 * The `CustomAlert` component displays a temporary alert (snack bar) message at the top right corner of the screen.
 * - It uses Material UI's `Alert` component for the notification display.
 * - The component automatically hides the alert after 3000 milliseconds (3 seconds).
 * - The position and z-index are customizable via inline styles.
 * 
 * @component
 * @example
 * const message = "Your action was successful!";
 * <CustomAlert message={message} />
 */
export default function CustomAlert({ message }) {
  const snackContainerStyle = {
    position: "absolute",
    top: 70, 
    left: "80%", 
    zIndex: 9999, 
  };
  const { showSnackBar, setShowSnackBar } = React.useContext(AlertContext);

  // Automatically close the snack bar after 3000 milliseconds (3 seconds)
  React.useEffect(() => {
    if (showSnackBar) {
      const timer = setTimeout(() => {
        setShowSnackBar(false);
      }, 3000); // Adjust the duration as needed (in milliseconds)
      return () => clearTimeout(timer);
    }
  }, [showSnackBar]);

  return (
    <div style={snackContainerStyle}>
      {showSnackBar && (
        <Alert severity="success" color="info">
          {message}
        </Alert>
      )}
    </div>
  );
}
