import React from "react";
import { TabContentProvider } from "../providers/TabContent";
import FilterTabs from "../components/common/filters/FilterTabs";
import HomeTabContent from "../components/common/filters/HomeTabContent";

/**
 * @component MoreArtworks
 * @description
 * This component serves as the page that displays more artworks. It includes the `FilterTabs` for filtering artwork and 
 * the `HomeTabContent` component to display the actual content. The `TabContentProvider` is used to provide a context 
 * for managing the active tab state across the components.
 * 
 * @returns {JSX.Element} The MoreArtworks component, rendering the filter tabs and artwork content.
 * 
 * @example
 * // Example usage of MoreArtworks component
 * <MoreArtworks />
 */
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
