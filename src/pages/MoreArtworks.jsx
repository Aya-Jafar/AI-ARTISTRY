import React from "react";
import { TabContentProvider } from "../providers/TabContent";
import FilterTabs from "../components/common/filters/FilterTabs";
import HomeTabContent from "../components/common/filters/HomeTabContent";

function MoreArtworks() {
  return (
    <>
      <TabContentProvider>
        <FilterTabs />
        <HomeTabContent isHomePage={false} />
      </TabContentProvider>
    </>
  );
}

export default MoreArtworks;
