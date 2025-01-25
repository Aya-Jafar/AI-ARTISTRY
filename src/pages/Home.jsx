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

/**
 * @description
 * The Home component serves as the landing page of the application.
 * It incorporates various sections such as Cover, About Us, filters with tabs,
 * a contact form, a quote, and a footer. Additionally, the background
 * is conditionally blurred based on the user's location (on login or signup).
 * The page also includes animations on mount and unmount for smooth transitions.
 */

function Home() {
  const location = useLocation();

  /**
   * @constant
   * @description Determines if the background should be blurred based on the current route.
   * @type {boolean}
   */
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
        {/* Section displaying cover image and title */}
        <Cover />
        {/* About Us section */}
        <AboutUs />
        {/* Tab content with filter options */}
        <TabContentProvider>
          <FilterTabs />
          <HomeTabContent isHomePage={true} />
        </TabContentProvider>
        {/* Contact form section */}
        <ContactForm />
        {/* Section displaying a quote */}
        <Quote />
        {/* Footer section */}
        <Footer />
      </>
    </motion.div>
  );
}

export default Home;
