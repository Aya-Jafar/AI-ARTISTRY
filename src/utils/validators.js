
/**
 * @function validateSignUpForm
 * @description
 * Validates the fields of the sign-up form. It checks the email, username, and password fields based on specific criteria and sets corresponding error messages.
 * @param {string} name - The name of the form field being validated (e.g., "email", "username", "password").
 * @param {string} value - The current value of the form field.
 * @param {Object} error - The current error state object that holds validation errors.
 * @param {Function} setError - The function used to update the error state object.
 */
export const validateSignUpForm = (name, value, error, setError) => {
  if (name === "email") {
    if (!validateEmail(value)) {
      setError({
        ...error,
        emailError: "Invalid email",
      });
    } else {
      setError({
        ...error,
        emailError: "", // Clear the error if the email is valid
      });
    }
  } else if (name === "username") {
    if (value.length <= 5) {
      setError({
        ...error,
        usernameError: "Full name must be at least 5 characters",
      });
    } else if (!/\s/.test(value)) {
      setError({
        ...error,
        usernameError: "Full name must contain at least one space",
      });
    } else if ((value.match(/[A-Z]/g) || []).length < 2) {
      setError({
        ...error,
        usernameError: "Full name must contain at least two uppercase letters",
      });
    } else {
      setError({
        ...error,
        usernameError: "",
      });
    }
  } else if (name === "password") {
    // Validation for the password field
    if (value.length < 8) {
      setError({
        ...error,
        passwordError: "Password must be at least 8 characters",
      });
    } else if (!/[A-Z]/.test(value)) {
      setError({
        ...error,
        passwordError: "Password must contain at least one uppercase letter",
      });
    } else if (!/[0-9]/.test(value)) {
      setError({
        ...error,
        passwordError: "Password must contain at least one digit",
      });
    } else {
      setError({
        ...error,
        passwordError: "",
      });
    }
  }
};


/**
 * @function validateEmail
 * @description
 * Validates an email string using a regular expression.
 * @param {string} email - The email string to validate.
 * @returns {boolean} Returns true if the email matches the pattern, false otherwise.
 */
export const validateEmail = (email) => {
  // use a regular expression or a library like 'validator' for more robust email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


/**
 * @function validateLoginForm
 * @description
 * Validates the login form fields. It checks if the email and password fields are filled and sets corresponding error messages.
 * @param {string} name - The name of the form field being validated (e.g., "email", "password").
 * @param {string} value - The current value of the form field.
 * @param {Object} errors - The current error state object that holds validation errors.
 * @param {Function} setErrors - The function used to update the error state object.
 */
export const validateLoginForm = (name, value, errors, setErrors) => {
  if (name === "email") {
    if (!value) {
      setErrors({
        ...errors,
        emailError: "Incorrect email",
      });
    }
  } else if (name === "password") {
    if(!value){
      setErrors({
        ...errors,
        passwordError: "Incorrect password",
      });
    }
  }
};
