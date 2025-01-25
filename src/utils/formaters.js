/**
 * A file for formatters functions and dynamic styling functions
 **/

import { styled } from "@mui/system";
import { Slider } from "@mui/material";

/**
 * @function formatDate
 * @description
 * Formats the given date into a string with the following format:
 * `DayOfWeek. Month Year Hour:Minute AM/PM AST`.
 * - Converts the time to a 12-hour clock format.
 * - Uses the short weekday, month, and year format.
 * @param {string} date - The date to be formatted.
 * @returns {Array} An array with two strings: the formatted date and the time.
 */
export const formatDate = (date) => {
  const inputDate = new Date(date);
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(inputDate);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    inputDate
  );
  const year = inputDate.getFullYear();

  // Get hour and minute
  let hour = inputDate.getHours();
  const minute = inputDate.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour clock format
  if (hour > 12) {
    hour -= 12;
  }

  // Create the formatted string
  const formattedDateStr = `${dayOfWeek}. ${month}. ${year}\n${hour}:${minute} ${ampm} AST`;

  return formattedDateStr.split("\n");
};

/**
 * @function makeNamesBold
 * @description
 * This helper function takes a string and makes any two capitalized words (e.g., names) bold.
 * It splits the text into regular and bold parts based on a regex pattern matching capitalized names.
 *
 * @param {string} text - The text to be processed.
 * @returns {Array} - An array of text parts, where names are wrapped in `<strong>` tags for bold styling.
 */
export const makeNamesBold = (text) => {
  // Define the regex pattern for bold names
  const highlightPattern = /\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g; // Example pattern for names

  const parts = text.split(new RegExp(`(${highlightPattern.source})`, "g"));

  return parts.map((part, idx) =>
    idx % 2 === 0 ? (
      part // Regular text
    ) : (
      <strong key={idx} style={{ fontWeight: "bold" }}>
        {part}
      </strong> // bold text
    )
  );
};

/**
 * @function infoStyle
 * @description
 * Returns an object with the CSS styles for the info section based on the length of the prompt and the screen width.
 * - Adjusts font size and width based on the prompt length and screen width.
 * @param {string} prompt - The user input for the prompt.
 * @returns {Object} The styles object for the info section.
 */
export const infoStyle = (prompt) => {
  const screenWidth = window.innerWidth;

  if (prompt.length >= 3) {
    if (screenWidth > 800) {
      return {
        fontSize: "15px",
        width: "25%",
      };
    } else {
      return {
        fontSize: "15px",
        width: "100%",
      };
    }
  } else {
    return {
      fontSize: "20px",
    };
  }
};

/**
 * @function alignTabText
 * @description
 * Returns the alignment styles for the tab text based on the tab's text.
 * @param {string} text - The text of the tab (e.g., "All", "Fantasy", "SCI-FI").
 * @returns {Object} The styles for positioning the tab text.
 */
export const alignTabText = (text) => {
  switch (text) {
    case "All":
      return {
        left: "45%",
      };
    case "Fantasy":
      return {
        left: "35%",
      };
    case "SCI-FI":
      return {
        left: "37%",
      };
  }
};

/**
 * @description
 * Provides a style object for link elements.
 */
export const linkStyles = {
  textDecoration: "none",
  color: "white",
};

/**
 * @function navGapSetter
 * @description
 * Sets the gap in the navigation bar based on whether the user is logged in or not.
 * @param {Object} currentUser - The current logged-in user.
 * @returns {Object} A style object with the gap property.
 */
export const navGapSetter = (currentUser) => {
  return { gap: currentUser ? "40px" : "50px" };
};

/**
 * @description
 * A styled Slider component with customized colors for the thumbs, track, and rail.
 */
export const CustomSlider = styled(Slider)(({ theme }) => ({
  // color: green500, //color of the slider between thumbs
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff", //color of thumbs
    height: 20,
  },
  "& .MuiSlider-rail": {
    color: "#fff", ////color of the slider outside  teh area between thumbs
    height: 13,
    backgroundColor: "#fff",
  },
  "& .MuiSlider-track": {
    color: "0473DA",
    height: 13, // Adjust the height to make the slider track thicker
  },
}));
