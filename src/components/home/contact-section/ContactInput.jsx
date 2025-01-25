import React from "react";


/**
 * @component
 * @description
 * The `ContactInput` component renders an input field with a label. 
 * It is used in the `ContactForm` to collect "Name" and "Email" from the user.
 * - The input type is dynamically set based on the `label` prop: if the label is "Email", the input type will be "email", otherwise it defaults to "text".
 * - The `name` prop is used to define the `name` attribute for the input field.
 * 
 * @param {string} label - The label for the input field (e.g., "Name" or "Email").
 * @param {string} name - The `name` attribute for the input field, used for form submission.
 * 
 * @example
 * // Renders a text input for "Name" and an email input for "Email"
 * <ContactInput label="Name" name="name" />
 * <ContactInput label="Email" name="email" />
 */
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
