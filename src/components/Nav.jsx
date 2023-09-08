import React, { useState, useEffect, useRef, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NavBtn from "./NavBtn";
import AuthContext from "../providers/Auth";
import UserSection from "./UserSection";

function Nav(props) {
  const { loginPopup, setLoginPopup, signupPopup, setSignupPopup } = props;

  const { currentUser, signOutUser } = useContext(AuthContext);
  const [showUserSection, setShowUserSection] = useState(false);

  console.log(currentUser && currentUser.uid);


  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);

  const toggleLoginPopup = () => setLoginPopup(!loginPopup);

  const toggleSignupPopup = () => setSignupPopup(!signupPopup);

  useEffect(() => {
    currentUser ? setShowUserSection(true) : setShowUserSection(false);
  }, [currentUser]);

  return (
    <>
      <div className="nav">
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            {/* <img src={logo} alt="" id="logo"/> */}
            <strong className="nav-title">{"ai Artistry".toUpperCase()}</strong>
          </Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
        <div
          className="nav-links"
          style={{ gap: currentUser ? "40px" : "50px" }}
        >
          <Link
            to="/imagine"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="nav-link">{"Imagine".toUpperCase()}</div>
          </Link>

          <div className="nav-link">CONTACT US</div>
          {showUserSection ? (
            <>
              <UserSection />
              <button className="btn" onClick={signOutUser}>
                SIGN OUT
              </button>
            </>
          ) : (
            <div className="nav-btns">
              <NavBtn
                path="/signup"
                action={toggleSignupPopup}
                text="SIGN UP"
                id="sign-up"
                setPopup={setSignupPopup}
                popup={signupPopup}
              />

              <NavBtn
                path="/login"
                action={toggleLoginPopup}
                text="LOG IN"
                id="login"
                setPopup={setLoginPopup}
                popup={loginPopup}
              />
            </div>
          )}
        </div>
      </div>

      <div class={menuActive ? "drop-down-menu open" : "drop-down-menu"}>
        <li>
          <Link to="/dream" style={{ textDecoration: "none", color: "white" }}>
            <div className="nav-link">DREAM</div>
          </Link>
        </li>
        <li>
          <div href="#">CONTACT US</div>
        </li>
        {/* TODO: Fix mobile size auth buttons issue */}

        {!signupPopup && (
          <NavBtn
            path="/signup"
            action={toggleSignupPopup}
            text="SIGN UP"
            id="sign-up"
            setSignupPopup={setSignupPopup}
            signupPopup={signupPopup}
          />
        )}

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
