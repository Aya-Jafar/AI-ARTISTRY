import React, { useState, useContext } from "react";
import AuthContext from "../../../providers/Auth";
import { handleSignUp } from "../../../backend/auth";
import { validateSignUpForm } from "../../../utils/validators";
import { useNavigate } from "react-router-dom";


function SignUpForm() {
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

  // Handle input changes and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    validateSignUpForm(name, value, error, setError);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
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
    // console.log("Sign Up Success");
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
