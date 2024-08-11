import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
import AuthContext from "../../../providers/Auth";
import UserSection from "./UserSection";
import logoutIcon from "../../../images/logout.png";
import { linkStyles, navGapSetter } from "../../../utils/formaters";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import MobileNav from "./MobileNav";

function Nav() {
  const { currentUser, signOutUser } = useContext(AuthContext);

  const [showUserSection, setShowUserSection] = useState(false);

  const [menuActive, setMenuActive] = useState(false);

  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [navigateToContact, setNavigateToContact] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);

  const token = localStorage.getItem("token");

  const currentLocation = useLocation();
  const navigate = useNavigate();

  const contactNavigate = () => {
    if (currentLocation.pathname !== "/") {
      // Navigate to the homepage and set the state to true
      navigate("/");
      setNavigateToContact(true);
    }
  };

  useEffect(() => {
    // Check if we need to scroll to the contact section after navigation
    if (navigateToContact && currentLocation.pathname === "/") {
      // Trigger the scroll by clicking the hidden ScrollLink element
      document.getElementById("hidden-scroll-link").click();
      setNavigateToContact(false); // Reset the state
    }
  }, [currentLocation.pathname, navigateToContact]);

  useEffect(() => {
    token ? setShowUserSection(true) : setShowUserSection(false);
  }, [token]);

  return (
    <>
      <div className="nav">
        <div>
          <Link to="/" style={{ ...linkStyles }}>
            {/* <img src={logo} alt="" id="logo"/> */}
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
                  src={logoutIcon}
                  alt=""
                  className="logout-btn"
                  onClick={signOutUser}
                />
                {hoveredLogout && <p onClick={signOutUser}>Log out</p>}
              </div>
            </>
          ) : (
            <div className="nav-btns">
              <NavButton path="/signup" text="SIGN UP" id="sign-up" />
              <NavButton path="/login" text="LOG IN" id="login" />
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
