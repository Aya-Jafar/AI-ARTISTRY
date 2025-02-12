import React from "react";

/**
 * @component
 * @description
 * The `Footer` component renders the footer section of the website, including contact information 
 * and links to social media accounts. It displays a title, social media icons with links, 
 * and a copyright notice.
 * 
 * @example
 * <Footer />
 * 
 */
function Footer() {
  return (
    <div className="footer">
      <div>
        <p className="footer-title">Contact our team</p>
        <div className="social-media">
          <a href="https://www.instagram.com/_aya.jaffar_/">
            <img src={"/instagram (2).png"} alt="" loading="lazy" />
          </a>
          <a href="https://www.facebook.com/AyaJaffar002">
            <img src={"/facebook-circular-logo.png"} alt="" loading="lazy" />
          </a>
          <a href="mailto:aya.jafar002@gmail.com">
            <img src={"/email (1).png"} alt="" loading="lazy" />
          </a>
        </div>
      </div>
      <p>&copy; {new Date().getFullYear()} AI ARTISTRY. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
