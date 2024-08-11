import React from "react";
import { linkStyles } from "../../../utils/formaters";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import UserSection from "./UserSection";
import NavButton from "./NavButton";

function MobileNav({
  showUserSection,
  signOutUser,
  contactNavigate,
  menuActive,
}) {
  return (
    <div class={ menuActive ? "drop-down-menu open" : "drop-down-menu"}>
      <li>
        <Link to="/imagine" style={{ ...linkStyles }}>
          <div className="nav-link">IMAGINE</div>
        </Link>
      </li>
      <li>
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
      </li>
      <>
        {showUserSection ? (
          <>
            <li>
              <UserSection />
            </li>
            <li>
              <div className="logout-section mobile">
                <img
                  src={"/logout.png"}
                  alt=""
                  className="logout-btn"
                  onClick={signOutUser}
                />
                <p onClick={signOutUser}>Log out</p>
              </div>
            </li>
          </>
        ) : (
          <>
            <NavButton path="/signup" text="SIGN UP" id="sign-up" />
            <NavButton path="/login" text="LOG IN" id="login" />
          </>
        )}
      </>
    </div>
  );
}

export default MobileNav;
