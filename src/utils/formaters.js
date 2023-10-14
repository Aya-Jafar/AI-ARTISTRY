import { styled } from "@mui/system";
import { Slider } from "@mui/material";

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

  console.log(inputDate, formattedDateStr);
  return formattedDateStr.split("\n");
};




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
export const linkStyles = {
  textDecoration: "none",
  color: "white",
};

export const navGapSetter = (currentUser) => {
  return { gap: currentUser ? "40px" : "50px" };
};

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
