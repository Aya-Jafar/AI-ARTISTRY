import React, { useState } from "react";
import Cover from "../components/Cover";
import Nav from "../components/Nav";
import AboutUs from "../components/AboutUs";

function Home(props) {
  const { loginPopup, signupPopup } = props;
//   console.log(loginPopup,  signupPopup);

  return (
    <>
      {/* <Nav
        loginPopup={loginPopup}
        setLoginPopup={setLoginPopup}
        signupPopup={signupPopup}
        setSignupPopup={setSignupPopup}
      /> */}

      <div
        className={`home ${(loginPopup || signupPopup) ? "blur-background" : ""}`}
      >
        <Cover />
        <AboutUs />
      </div>
    </>
  );
}

export default Home;
