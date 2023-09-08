import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function useClickOutside(ref, showPopup, onClickOutside) {
  //   console.log(showPopup);
  const navigate = useNavigate();

  console.log("from hook" , showPopup);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target) && showPopup) {
        onClickOutside();

        navigate("/");
      }
      

    //   if (!showPopup) {
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 10000);
    //   }

    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, onClickOutside, showPopup]);
}

export default useClickOutside;
