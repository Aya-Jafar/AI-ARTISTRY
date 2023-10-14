import React from "react";
import igIcon from "../../images/instagram (2).png";
import fbIcon from "../../images/facebook-circular-logo.png";
import emailIcon from "../../images/email (1).png";
import { linkStyles } from "../../utils/formaters";

function Footer() {
  return (
    <div className="footer">
      <div>
        <p className="footer-title">Contact our team</p>
        <div className="social-media">
          <a href="https://www.instagram.com/_aya.jaffar_/">
            <img src={igIcon} alt="" />
          </a>
          <a href="https://www.facebook.com/AyaJaffar002">
            <img src={fbIcon} alt="" />
          </a>
          <a href="mailto:aya.jafar002@gmail.com">
            <img src={emailIcon} alt="" />
          </a>
        </div>
      </div>
      <p>&copy; {new Date().getFullYear()} AI ARTISTRY. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
