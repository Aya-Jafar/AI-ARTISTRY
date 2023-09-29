import React from "react";
import closeIcon from "../../../images/close.png";
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
      <img src={closeIcon} alt="" />
    </div>
  );
}

export default CloseButton;
