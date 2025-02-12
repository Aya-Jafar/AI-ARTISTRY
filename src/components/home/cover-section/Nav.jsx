import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
import AuthContext from "../../../providers/Auth";
import UserSection from "./UserSection";
import { linkStyles, navGapSetter } from "../../../utils/formaters";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import MobileNav from "./MobileNav";

/**
 * @component
 * @description
 * The `Nav` component represents the main navigation bar of the application.
 * - It includes links for "IMAGINE", "CONTACT US", and conditional rendering of user-related sections.
 * - If the user is authenticated (`currentUser` exists), the user's profile section and a logout button are shown.
 * - If the user is not authenticated, buttons for login and signup are displayed.
 * - On mobile, a responsive hamburger menu is used to toggle the visibility of the navigation links.
 *
 * @example
 * <Nav />
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
function Nav() {
  /**
   * @description
   * This section manages the navigation state, including the menu visibility,
   * user authentication state, and navigating to the contact section.
   */
  const { currentUser, signOutUser } = useContext(AuthContext);
  const [showUserSection, setShowUserSection] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [navigateToContact, setNavigateToContact] = useState(false);
  const toggleMenu = () => setMenuActive(!menuActive);
  const token = localStorage.getItem("token");
  const currentLocation = useLocation();
  const navigate = useNavigate();

  /**
   * @description
   * This section manages the navigation state, including the menu visibility,
   * user authentication state, and navigating to the contact section.
   */
  const contactNavigate = () => {
    if (currentLocation.pathname !== "/") {
      // Navigate to the homepage and set the state to true
      navigate("/");
      setNavigateToContact(true);
    }
  };

  /**
   * @effect
   * @description
   * Watches for the contact navigation state and triggers scrolling to the contact section.
   * - Clears the navigate state after scrolling.
   * @dependencies [currentLocation.pathname, navigateToContact]
   */
  useEffect(() => {
    // Check if we need to scroll to the contact section after navigation
    if (navigateToContact && currentLocation.pathname === "/") {
      // Trigger the scroll by clicking the hidden ScrollLink element
      document.getElementById("hidden-scroll-link").click();
      setNavigateToContact(false); // Reset the state
    }
  }, [currentLocation.pathname, navigateToContact]);

  /**
   * @effect
   * @description
   * Checks if the user is authenticated based on the presence of the token.
   * - Updates `showUserSection` accordingly.
   * @dependencies [token]
   */
  useEffect(() => {
    token ? setShowUserSection(true) : setShowUserSection(false);
  }, [token]);

  return (
    <>
      <div className="nav">
        <div>
          <Link to="/" style={{ ...linkStyles }}>
            <strong className="nav-title">{"ai Artistry".toUpperCase()}</strong>
          </Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>

        <div className="nav-links" style={navGapSetter(currentUser)}>
          <Link to="/imagine" style={{ ...linkStyles }}>
            <div className="nav-link">{"Imagine".toUpperCase()}</div>
          </Link>

          <motion.div className="nav-link">
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              onClick={contactNavigate}
            >
              CONTACT US
            </ScrollLink>
          </motion.div>

          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1000}
            id="hidden-scroll-link"
            style={{ display: "none" }}
          />

          {showUserSection ? (
            <>
              <UserSection />
              <div
                className="logout-section"
                onMouseOver={() => setHoveredLogout(true)}
                onMouseLeave={() => setHoveredLogout(false)}
              >
                <img
                  loading="lazy"
                  src={"/logout.png"}
                  alt=""
                  className="logout-btn"
                  onClick={signOutUser}
                />
                {hoveredLogout && <p onClick={signOutUser}>Log out</p>}
              </div>
            </>
          ) : (
            <div className="nav-btns">
              <NavButton type="signup" text="SIGN UP" id="sign-up" />
              <NavButton type="login" text="LOG IN" id="login" />
            </div>
          )}
        </div>
      </div>
      <MobileNav
        showUserSection={showUserSection}
        signOutUser={signOutUser}
        contactNavigate={contactNavigate}
        menuActive={menuActive}
      />
    </>
  );
}

export default Nav;
