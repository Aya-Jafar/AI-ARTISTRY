import React from "react";
import leftImage from "../../../images/contact-image.png";
import ContactInput from "./ContactInput";

function ContactForm() {
  return (
    <div className="contact" id="contact">
      <div className="left-form-image">
        <img src={leftImage} alt="" loading="lazy" />
      </div>
      <form
        className="form"
        action="https://formspree.io/f/maygpkyv"
        method="POST"
      >
        <h1>CONTACT US</h1>
        <ContactInput label="Name" name="name" />
        <ContactInput label="Email" name="email" />
        <div>
          <label htmlFor="">Message: </label>
          <br />
          <textarea
            id="contact-input"
            name="message"
            style={{ paddingRight: "4%" }}
            required
          />
        </div>

        <button className="btn" id="send-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
export default ContactForm;
