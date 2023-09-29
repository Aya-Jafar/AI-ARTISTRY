import React, { useContext, useState } from "react";
import allPic from "../../../images/all-tab.png";
import { motion } from "framer-motion";
import { fadeIn, scaleOnHover } from "../../../utils/motion";
import TabContext from "../../../providers/TabContent";
import fantasyTab from "../../../images/fantasy-tab.png";
import { alignTabText } from "../../../utils/styleSetter";
import scifiPic from "../../../images/sci-fi-tab.webp";

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

function FilterTabs() {
  const { setCurrentTab } = useContext(TabContext);
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (text) => {
    setCurrentTab(text);
    setActiveTab(text);
  };

  return (
    <>
      <div className="filter-tabs">
        <Tab
          img={allPic}
          text="All"
          isActive={activeTab === "All"}
          onClick={() => handleTabClick("All")}
        />
        <Tab
          img={fantasyTab}
          text="Fantasy"
          isActive={activeTab === "Fantasy"}
          onClick={() => handleTabClick("Fantasy")}
        />
        <Tab
          img={scifiPic}
          text="SCI-FI"
          isActive={activeTab === "SCI-FI"}
          onClick={() => handleTabClick("SCI-FI")}
        />
      </div>
    </>
  );
}

export default FilterTabs;
