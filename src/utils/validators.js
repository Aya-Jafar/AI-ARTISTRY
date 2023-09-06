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

export const validateEmail = (email) => {
  // use a regular expression or a library like 'validator' for more robust email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};



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
