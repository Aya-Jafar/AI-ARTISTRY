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
