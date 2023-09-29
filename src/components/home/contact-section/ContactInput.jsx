import React from "react";

function ContactInput({ label, name }) {
  return (
    <div>
      <label htmlFor="">{label}: </label>
      <br />
      <input
        type={label === "Email" ? "email" : "text"}
        name={name}
        id="contact-input"
        required
      />
    </div>
  );
}

export default ContactInput;
