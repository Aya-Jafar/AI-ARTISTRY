import React from "react";

function ButtonWithIcon({ icon, text }) {
  return (
    <button className="btn">
      <div className="btn-content">
        <img src={icon} alt="" id="more-btn" />
        {text}
      </div>
    </button>
  );
}

export default ButtonWithIcon;
