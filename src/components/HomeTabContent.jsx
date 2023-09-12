import React, { useContext } from "react";
import TabContext from "../providers/TabContent";
import MainArtGrid from "./AllTab";
import FantasyTab from "./FantasyTab";
import SciFiTab from "./SciFiTab";

function HomeTabContent() {
  const { currentTab } = useContext(TabContext);

  const generateTabContent = () => {
    switch (currentTab) {
      case "All":
        return <MainArtGrid />;
      case "Fantasy":
        return <FantasyTab />;
      case "SCI-FI":
        return <SciFiTab />;
    }
  };

  return <>{generateTabContent()}</>;
}

export default HomeTabContent;
