import React, { useContext, useEffect } from "react";
import TabContext from "../providers/TabContent";
import MainArtGrid from "./AllTab";
import FantasyTab from "./FantasyTab";

function ArtGrid() {
  const { currentTab } = useContext(TabContext);

  const generateTabContent = () => {
    switch (currentTab) {
      case "All":
        return <MainArtGrid />;
      case "Fantasy":
        return <FantasyTab />;
      case "SCI-FI":
        return <h1>SCI-FI</h1>;
    }
  };

  return <>{generateTabContent()}</>;
}

export default ArtGrid;
