import React, { useContext } from "react";
import Cover from "../components/Cover";
import Nav from "../components/Nav";
import AboutUs from "../components/AboutUs";
import { useLocation } from "react-router-dom";
import FilterTabs from "../components/FilterTabs";
import { TabContentProvider } from "../providers/TabContent";
import { motion } from "framer-motion";
import HomeTabContent from "../components/HomeTabContent";
import AuthPopupContext from "../providers/AuthPopup";

function Home() {
  const location = useLocation();

  const isBlured =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <motion.div
        className={`home ${isBlured ? "blur-background" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Cover />
        <AboutUs />

        <TabContentProvider>
          <FilterTabs />
          <HomeTabContent />
        </TabContentProvider>
      </motion.div>
    </>
  );
}

export default Home;
