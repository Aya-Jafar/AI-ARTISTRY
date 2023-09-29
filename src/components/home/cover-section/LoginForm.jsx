import React, { useState, useContext } from "react";
import AuthContext from "../../../providers/Auth";
import { handleSignIn } from "../../../backend/auth";
import { validateLoginForm } from "../../../utils/validators";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

function LoginForm() {
  const { logInWithEmailAndPassword } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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
      // if (formData.email && formData.password) {
        await handleSignIn(
          logInWithEmailAndPassword,
          formData.email,
          formData.password,
          setErrorMessage
        );
        setSuccess(true);
        // navigate("/");
     
      // }
    } catch (error) {
      console.error(error.message.split("/")[1]);
      setSuccess(false);
    } finally {
      setLoading(false); // Ensure loading is set to false after sign-in attempt
    }
    // if (success !== null) {
    //   setSuccess(false);
    // }
  };

  console.log(success);

  // const snackBar = (
  //   <Box sx={{ display: "flex", justifyContent: "center" }}>Top-Center</Box>
  // );

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
          <button type="submit" className="btn" id="login-btn">
            {loading ? "Loading..." : "Log in"}
          </button>
        </center>
      </form>

      {success !== null && (
        <>
          {success && errorMessage.length === 0 ? (
            <center>
              <p>You Logged in successfully</p>
            </center>
          ) : (
            <center>
              <p>{`Logging in failed (${errorMessage}`} </p>
            </center>
          )}
        </>
      )}
    </>
  );
}

export default LoginForm;
