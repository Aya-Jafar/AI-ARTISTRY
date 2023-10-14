import React, { useContext } from "react";
import Cover from "../components/home/cover-section/Cover";
import AboutUs from "../components/home/about-us-section/AboutUs";
import { useLocation } from "react-router-dom";
import FilterTabs from "../components/common/filters/FilterTabs";
import { TabContentProvider } from "../providers/TabContent";
import { motion } from "framer-motion";
import HomeTabContent from "../components/common/filters/HomeTabContent";
import ContactForm from "../components/home/contact-section/ContactForm";
import Quote from "../components/home/Quote";
import Footer from "../components/home/Footer";

function Home() {
  const location = useLocation();

  // Check if the current route is not the Imagine page and not the profile page
  // const showHomePage =
  //   location.pathname !== "/imagine" &&
  //   !location.pathname.startsWith("/profile") &&
  //   !location.pathname.startsWith("/artwork/") &&
  //   location.pathname !== "/artworks/more/";

  console.log(location.pathname);

  const isBlured =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {true && (
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
            <HomeTabContent isHomePage={true} />
          </TabContentProvider>

          <ContactForm />
          <Quote />

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default Home;
