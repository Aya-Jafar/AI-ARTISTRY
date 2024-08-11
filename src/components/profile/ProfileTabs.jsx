import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileTabContext from "../../providers/ProfileTabContent";
import AuthContext from "../../providers/Auth";
import { getSavedArtworks } from "../../backend/data";
import { Activity ,Bookmark , LayoutDashboard} from 'lucide-react';

function Tab({ text, icon: Icon, isActive, onClick }) {
  return (
    <div className={isActive ? "active-tab" : ""} onClick={onClick}>
      <motion.div className="profile-tab">
        <Icon size={35}/>
        <h3>{text}</h3>
      </motion.div>
    </div>
  );
}

function ProfileTabs() {
  const { currentProfileTab, setProfileTab } = useContext(ProfileTabContext);
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Activity");
  const [token, setToken] = useState("")

  const [defaultImage, setActiveImage] = useState("");

  const handleTabClick = (text) => {
    setProfileTab(text);
    setActiveTab(text);
  };
  useEffect(() => {
    getSavedArtworks(currentUser && currentUser.uid, setActiveImage);
  }, [currentUser]);

  
  return (
    <>
      <div className="profile-tabs" style={{ marginTop: "3%" }}>
        <Tab
          text="Activity"
          icon={Activity}
          isActive={activeTab === "Activity"}
          onClick={() => handleTabClick("Activity")}
        />
        
        {currentUser &&
          currentUser?.accessToken === localStorage.getItem("token") && (
            <Tab
              text="Saved"
              icon={Bookmark}
              isActive={activeTab === "Saved"}
              onClick={() => handleTabClick("Saved")}
            />
          )}

        <Tab
          text="Posts"
          icon={LayoutDashboard}
          isActive={activeTab === "Posts"}
          onClick={() => handleTabClick("Posts")}
        />
      </div>
    </>
  );
}

export default ProfileTabs;
