import React, { useContext } from "react";
import TabContext from "../../../providers/TabContent";
import MainArtGrid from "./MainGrid";
import FantasyTab from "./FantasyTab";
import SciFiTab from "./SciFiTab";

function HomeTabContent({ isHomePage }) {
  const { currentTab } = useContext(TabContext);

  const generateTabContent = () => {
    switch (currentTab) {
      case "All":
        return <MainArtGrid isHomePage={isHomePage} />;
      case "Fantasy":
        return <FantasyTab />;
      case "SCI-FI":
        return <SciFiTab />;
    }
  };

  return <>{generateTabContent()}</>;
}

export default HomeTabContent;
