import React, { useContext, Suspense, lazy } from "react";
import TabContext from "../../../providers/TabContent";

// Lazy load the tab content components
const MainArtGrid = lazy(() => import("./MainGrid"));
const FantasyTab = lazy(() => import("./FantasyTab"));
const SciFiTab = lazy(() => import("./SciFiTab"));

/**
 * @description
 * The `HomeTabContent` component renders different tab content based on the currently active tab.
 * - It uses the `TabContext` to determine the active tab and displays the appropriate content.
 * - The component handles three tabs: "All", "Fantasy", and "SCI-FI".
 * - Depending on the active tab, the component conditionally renders the `MainArtGrid`, `FantasyTab`, or `SciFiTab`.
 *
 * @component
 * @example
 * <HomeTabContent isHomePage={true} />
 */
function HomeTabContent({ isHomePage }) {
  const { currentTab } = useContext(TabContext);

  /**
   * @function generateTabContent
   * @description
   * Determines and renders the content for the active tab.
   * - "All" renders the `MainArtGrid`.
   * - "Fantasy" renders the `FantasyTab`.
   * - "SCI-FI" renders the `SciFiTab`.
   *
   * @returns {JSX.Element} The content component for the current tab.
   */
  const generateTabContent = () => {
    switch (currentTab) {
      case "All":
        return <MainArtGrid isHomePage={isHomePage} />;
      case "Fantasy":
        return <FantasyTab />;
      case "SCI-FI":
        return <SciFiTab />;
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<span className="loader"></span>}>
      {generateTabContent()}
    </Suspense>
  );
}

export default HomeTabContent;
