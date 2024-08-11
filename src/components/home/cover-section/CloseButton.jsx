import React from "react";
import { useNavigate } from "react-router-dom";

function CloseButton({ setPopup }) {
  const navigate = useNavigate();

  return (
    <div
      className="close-btn"
      onClick={() => {
        setPopup(false);
        navigate("/");
      }}
    >
      <img src={"/close.png"} alt="" />
    </div>
  );
}

export default CloseButton;
