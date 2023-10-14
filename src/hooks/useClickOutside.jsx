import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../providers/Auth";

function useClickOutside(ref, showPopup, onClickOutside) {
  const { currentUser } = useContext(AuthContext);
  //   console.log(showPopup);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        showPopup &&
        event.target.id !== "gmail-btn" &&
        event.target.id !== "email" &&
        event.target.id !== "password" &&
        event.target.id !== "login-btn" &&
        event.target.id !== "username" &&
        event.target.id !== "signup-btn" &&
        event.target.id !== "signup-from-login"
      ) {
        onClickOutside();
        navigate("/");
      }
    };
    // The event.target is anything is clicked outsite of the popup
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, onClickOutside, showPopup]);
}

export default useClickOutside;
