import React from "react";
import ContactInput from "./ContactInput";

/**
 * @component
 * @description
 * The `ContactForm` component renders a contact form where users can submit their name, email, and a message. 
 * - The form is connected to Formspree to handle form submission.
 * - Includes custom `ContactInput` components for the "Name" and "Email" fields.
 * - The "Message" field is a textarea input that allows users to type a message.
 * - A submit button sends the form data to Formspree.
 * 
 * @example
 * // Renders a contact form with Name, Email, and Message fields
 * <ContactForm />
 */
function ContactForm() {
  return (
    <div className="contact" id="contact">
      <div className="left-form-image">
        <img src={"/contact-image.png"} alt="" />
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
