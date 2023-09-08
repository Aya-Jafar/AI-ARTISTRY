import React, { useState } from "react";
import Cover from "../components/Cover";
import Nav from "../components/Nav";
import AboutUs from "../components/AboutUs";
import { useLocation } from "react-router-dom";
import FilterTabs from "../components/FilterTabs";
import { TabContentProvider } from "../providers/TabContent";
import { motion } from "framer-motion";
import ArtGrid from "../components/ArtGrid";

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
          <ArtGrid />
        </TabContentProvider>
      </motion.div>
    </>
  );
}

export default Home;
