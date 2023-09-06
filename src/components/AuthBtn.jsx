import React from "react";

function AuthBtn({ icon, onClick, text, id }) {
  return (
    <button className="signup-btns" id={id} onClick={onClick}>
      <div>
        <img src={icon} alt="" className="auth-icon" />
      </div>
      {text}
    </button>
  );
}


export default AuthBtn;
