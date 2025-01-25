import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { TabContentProvider } from "../providers/TabContent";
import { motion } from "framer-motion";

// Lazy load the components
const Cover = React.lazy(() =>
  import("../components/home/cover-section/Cover")
);
const AboutUs = React.lazy(() =>
  import("../components/home/about-us-section/AboutUs")
);
const FilterTabs = React.lazy(() =>
  import("../components/common/filters/FilterTabs")
);
const HomeTabContent = React.lazy(() =>
  import("../components/common/filters/HomeTabContent")
);
const ContactForm = React.lazy(() =>
  import("../components/home/contact-section/ContactForm")
);
const Quote = React.lazy(() => import("../components/home/Quote"));
const Footer = React.lazy(() => import("../components/home/Footer"));

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
        {/* Lazy loaded components wrapped with Suspense */}
        <React.Suspense fallback={<span class="loader"></span>}>
          <Cover />
          <AboutUs />
          <TabContentProvider>
            <FilterTabs />
            <HomeTabContent isHomePage={true} />
          </TabContentProvider>
          <ContactForm />
          <Quote />
          <Footer />
        </React.Suspense>
      </>
    </motion.div>
  );
}

export default Home;
