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
