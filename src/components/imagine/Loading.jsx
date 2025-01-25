import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

/**
 * @description
 * `BorderLinearProgress` is a styled version of the MUI `LinearProgress` component.
 * It is customized with a specific height, width, border radius, and positioning for use in a progress bar.
 * The progress bar’s color dynamically adapts based on the theme (light or dark mode) using the `theme.palette`.
 * - In light mode, the background color is set to a grey tone, and the bar color is a bright blue (`#50D5FF`).
 * - In dark mode, the background color is a darker grey, and the bar color is a deeper blue (`#308fe8`).
 * The component is positioned absolutely, with custom top and left offsets.
 * 
 * @example
 * <BorderLinearProgress value={progress} />
 */
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 14,
  width: "90%",
  borderRadius: 7,
  position: "absolute",
  top: "30vh",
  left: "25px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },

  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#50D5FF" : "#308fe8",
  },
}));

/**
 * @component
 * @description
 * The CustomizedProgressBars component renders a progress bar that updates periodically.
 * It uses the `LinearProgress` component from MUI, styled with custom colors and animations.
 * The progress bar increases by 10% every 800ms until it reaches 100%, at which point it resets to 0.
 * If an error is passed as a prop, it displays the error message as text instead of the progress bar.
 * 
 * @param {Object} props
 * @param {string|null} props.error - Optional error message to display. If null, the progress bar is shown.
 * 
 * @example
 * <CustomizedProgressBars />
 */

export default function CustomizedProgressBars({ error = null }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1, position: "relative", height: "50vh" }}>
      {error !== null ? (
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "25vh",
            left: "25px",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {error}
        </Typography>
      ) : (
        <BorderLinearProgress value={progress} />
      )}
    </Box>
  );
}
