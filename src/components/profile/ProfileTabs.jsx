import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileTabContext from "../../providers/ProfileTabContent";
import { ProfileTabProvider } from "../../providers/ProfileTabContent";
import AuthContext from "../../providers/Auth";
import { getSavedArtworks } from "../../backend/data";
import saveIcon from "../../images/save-instagram.png";
import likeIcon from "../../images/heart (2).png";
import cart from "../../images/shopping-cart.png";


function Tab({ text, icon, isActive, onClick }) {
  return (
    <div className={isActive ? "active-tab" : ""} onClick={onClick}>
      <motion.div className="profile-tab">
        <img src={icon} alt="" />
        <h3>{text}</h3>
      </motion.div>
    </div>
  );
}

function ProfileTabs() {
  const { currentProfileTab, setProfileTab } = useContext(ProfileTabContext);
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Saved");

  const [defaultImage, setActiveImage] = useState("");

  const handleTabClick = (text) => {
    setProfileTab(text);
    setActiveTab(text);
  };
  useEffect(() => {
    getSavedArtworks(currentUser, setActiveImage);
  }, [currentUser]);

  // console.log(currentProfileTab);

  //   console.log(defaultImage[0].image);
  return (
    <>
      <div className="profile-tabs" style={{ marginTop: "3%" }}>
        <Tab
          text="Saved"
          icon={saveIcon}
          isActive={activeTab === "Saved"}
          onClick={() => handleTabClick("Saved")}
        />
        <Tab
          text="Liked"
          icon={likeIcon}
          isActive={activeTab === "Liked"}
          onClick={() => handleTabClick("Liked")}
        />
        <Tab
          text="Cart"
          icon={cart}
          isActive={activeTab === "Cart"}
          onClick={() => handleTabClick("Cart")}
        />
      </div>
    </>
  );
}

export default ProfileTabs;
