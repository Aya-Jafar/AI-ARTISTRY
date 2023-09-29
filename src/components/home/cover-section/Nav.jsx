import React, { useState, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
import AuthContext from "../../../providers/Auth";
import UserSection from "./UserSection";
import logoutIcon from "../../../images/logout.png";
import { linkStyles, navGapSetter } from "../../../utils/styleSetter";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

function Nav() {
  const { currentUser, signOutUser } = useContext(AuthContext);

  const [showUserSection, setShowUserSection] = useState(false);

  const [menuActive, setMenuActive] = useState(false);

  const [hoveredLogout, setHoveredLogout] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // currentUser ? setShowUserSection(true) : setShowUserSection(false);
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
            >
              CONTACT US
            </ScrollLink>
          </motion.div>

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

      <div class={menuActive ? "drop-down-menu open" : "drop-down-menu"}>
        <li>
          <Link
            to="/imagine"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="nav-link">IMAGINE</div>
          </Link>
        </li>
        <li>
          <div href="#">CONTACT US</div>
        </li>
        {/* TODO: Fix mobile size auth buttons issue */}

        {/* <NavBtn path="/signup" text="SIGN UP" id="sign-up" /> */}

        {/* <li>
          <UserSection
            toggleSignupPopup
            setSignupPopup
            signupPopup
            toggleLoginPopup
            setLoginPopup
            loginPopup
          />
        </li> */}
      </div>
    </>
  );
}

export default Nav;
