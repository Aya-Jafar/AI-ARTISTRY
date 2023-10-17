import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Cover from "../components/home/cover-section/Cover";
import AboutUs from "../components/home/about-us-section/AboutUs";
import FilterTabs from "../components/common/filters/FilterTabs";
import { TabContentProvider } from "../providers/TabContent";
import { motion } from "framer-motion";
import HomeTabContent from "../components/common/filters/HomeTabContent";
import ContactForm from "../components/home/contact-section/ContactForm";
import Quote from "../components/home/Quote";
import Footer from "../components/home/Footer";

function Home() {
  const location = useLocation();

  const isBlured =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <motion.div
      className={`home ${isBlured ? "blur-background" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <>
        <Cover />
        <AboutUs />
        <TabContentProvider>
          <FilterTabs />
          <HomeTabContent isHomePage={true} />
        </TabContentProvider>
        <ContactForm />
        <Quote />
        <Footer />
      </>
    </motion.div>
  );
}

export default Home;
