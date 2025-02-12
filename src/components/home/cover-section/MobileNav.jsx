import React from "react";
import { linkStyles } from "../../../utils/formaters";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import UserSection from "./UserSection";
import NavButton from "./NavButton";

/**
 * @component
 * @description
 * The `MobileNav` component represents the mobile version of the navigation menu.
 * - It renders a dropdown menu with navigation links for "IMAGINE" and "CONTACT US".
 * - Depending on the `showUserSection` prop, it conditionally renders either the user's info section (`UserSection`) or login/signup buttons.
 * - It also includes a logout button when the user is signed in.
 *
 * @example
 * <MobileNav
 *   showUserSection={true}
 *   signOutUser={signOutFunction}
 *   contactNavigate={contactNavigateFunction}
 *   menuActive={true}
 * />
 * 
 * @param {Object} props - Component props.
 * @param {boolean} props.showUserSection - Determines whether the user section (profile info) is shown.
 * @param {function} props.signOutUser - Callback function for signing the user out.
 * @param {function} props.contactNavigate - Callback function for navigating to the contact section.
 * @param {boolean} props.menuActive - Determines if the menu is open or closed.
 * @returns {JSX.Element} The rendered mobile navigation menu.
 */

function MobileNav({
  showUserSection,
  signOutUser,
  contactNavigate,
  menuActive,
}) {
  return (
    <div class={menuActive ? "drop-down-menu open" : "drop-down-menu"}>
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
                  loading="lazy"
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
            <NavButton type="signup" text="SIGN UP" id="sign-up" />
            <NavButton type="login" text="LOG IN" id="login" />
          </>
        )}
      </>
    </div>
  );
}

export default MobileNav;
