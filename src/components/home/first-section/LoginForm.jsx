import React, { useState, useContext } from "react";
import AuthContext from "../../../providers/Auth";
import { handleSignIn } from "../../../backend/auth";
import { validateLoginForm } from "../../../utils/validators";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { logInWithEmailAndPassword } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // validateSignUpForm(name, value, error, setError);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await handleSignIn(
        logInWithEmailAndPassword,
        formData.email,
        formData.password
      );
      // If the sign-in is successful, set success to true
      setSuccess(true);
    } catch (error) {
      // Handle sign-in error here if needed
    } finally {
      setLoading(false); // Ensure loading is set to false after sign-in attempt
    }

    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <center>
          <button type="submit" className="btn">
            {loading ? "Loading..." : "Log in"}
          </button>
        </center>
      </form>
      {success && (
        <center>
          <p>You logged in successfully ✔️</p>
        </center>
      )}
    </>
  );
}

export default LoginForm;
