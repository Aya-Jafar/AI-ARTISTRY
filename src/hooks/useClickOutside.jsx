import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function useClickOutside(ref, showPopup, onClickOutside) {
  //   console.log(showPopup);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        showPopup &&
        event.target.id !== "gmail-btn"
      ) {
        onClickOutside();
        console.log(ref, event.target);

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
