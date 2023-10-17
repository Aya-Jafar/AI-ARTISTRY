import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertContext from "../../providers/Alert";

export default function CustomAlert({ message }) {
  const snackContainerStyle = {
    position: "absolute",
    top: 70, // Adjust top and left values to position the snack bar as needed
    left: "75%", // You can adjust this value to horizontally center the snack bar
    // transform: "translateX(-50%)",
    zIndex: 9999, // Adjust the z-index to control stacking order
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
