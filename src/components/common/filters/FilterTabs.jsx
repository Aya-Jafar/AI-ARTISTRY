import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, scaleOnHover } from "../../../utils/motion";
import TabContext from "../../../providers/TabContent";
import { alignTabText } from "../../../utils/formaters";

function Tab({ img, text, isActive, onClick }) {
  return (
    <div className={`filter ${isActive ? "clicked" : ""}`} onClick={onClick}>
      <motion.img
        src={img}
        alt=""
        className="filter-images"
        variants={fadeIn}
        whileHover={scaleOnHover}
      />

      <div className="filter-text" style={alignTabText(text)}>
        {text}
      </div>
    </div>
  );
}

/**
 * @description
 * The `FilterTabs` component renders a set of tabs that allow the user to filter content based on categories like "All", "Fantasy", and "SCI-FI".
 * - The active tab is highlighted, and clicking on a tab triggers the update of the current tab in the `TabContext`.
 * - The component leverages motion effects for smooth hover and fade-in animations on the tabs using `framer-motion`.
 *
 * @component
 * @example
 * <FilterTabs />
 */

function FilterTabs() {
  const { setCurrentTab } = useContext(TabContext);
  const [activeTab, setActiveTab] = useState("All");

  /**
   * @function handleTabClick
   * @description
   * Handles the click event on a tab to update the current tab and set the active state.
   * - Updates the `currentTab` in the `TabContext`.
   * - Sets the active tab to the clicked tab.
   *
   * @param {string} text - The text of the clicked tab, which determines the active tab.
   */
  const handleTabClick = (text) => {
    setCurrentTab(text);
    setActiveTab(text);
  };

  return (
    <>
      <div className="filter-tabs">
        <Tab
          img={"/all-tab.png"}
          text="All"
          isActive={activeTab === "All"}
          onClick={() => handleTabClick("All")}
        />
        <Tab
          img={"/fantasy-tab.png"}
          text="Fantasy"
          isActive={activeTab === "Fantasy"}
          onClick={() => handleTabClick("Fantasy")}
        />
        <Tab
          img={"/sci-fi-tab.webp"}
          text="SCI-FI"
          isActive={activeTab === "SCI-FI"}
          onClick={() => handleTabClick("SCI-FI")}
        />
      </div>
    </>
  );
}

export default FilterTabs;
