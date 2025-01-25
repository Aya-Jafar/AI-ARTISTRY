import React, { useState, useContext } from "react";
import AuthContext from "../../../providers/Auth";
import { handleSignUp } from "../../../backend/auth";
import { validateSignUpForm } from "../../../utils/validators";
import { useNavigate } from "react-router-dom";

/**
 * @component
 * @description
 * The `SignUpForm` component handles user sign-up by collecting the email, username, and password, validating input fields, and handling form submission.
 * After submission, the user is redirected and shown a success message.
 *
 * @example
 * <SignUpForm />
 *
 */
function SignUpForm() {
  /**
   * @description
   * Destructures relevant functions and state from the AuthContext and local component state.
   */
  const { signUpWithEmailAndPassword } = useContext(AuthContext);

  // Define state variables to store form data
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    usernameError: "",
    passwordError: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * @function handleInputChange
   * @description
   * Handles changes in the input fields, validates each field, and updates the form data.
   * @param {object} e - The event object from the input change.
   * @returns {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    validateSignUpForm(name, value, error, setError);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * @function handleSubmit
   * @description
   * Handles form submission, triggers sign-up logic, shows loading indicator, and redirects the user after a successful sign-up.
   * @param {object} e - The event object for form submission.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    handleSignUp(
      signUpWithEmailAndPassword,
      formData.email,
      formData.username,
      formData.password
    );

    // Delay showing success message for 3 seconds
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 3000);

    navigate("/");
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className={error.emailError ? "with-error" : ""}
            onChange={handleInputChange}
            required
          />
          <div
            className="error"
            style={{ display: error.emailError ? "block" : "none" }}
          >
            {error.emailError}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Full name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={error.usernameError ? "with-error" : ""}
            required
          />
          <div
            className="error"
            style={{ display: error.usernameError ? "block" : "none" }}
          >
            {error.usernameError}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={error.passwordError ? "with-error" : ""}
            required
          />
          <div
            className="error"
            style={{ display: error.passwordError ? "block" : "none" }}
          >
            {error.passwordError}
          </div>
        </div>
        <br />
        <center>
          <button type="submit" className="btn" id="signup-btn">
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </center>
      </form>
      {success ? (
        <center>
          <p>You signed up successfully ✔️</p>
        </center>
      ) : (
        <></>
      )}
    </>
  );
}

export default SignUpForm;
