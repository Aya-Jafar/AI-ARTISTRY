import React from "react";

/**
 * @description
 * The `ButtonWithIcon` component renders a button with an icon and text.
 * - The button consists of a container for an image icon and a text label.
 * - The icon is passed as a prop, allowing customization for different button types.
 * - The text prop allows customization of the button's label.
 *
 * @component
 * @example
 * const icon = "path/to/icon.png";
 * <ButtonWithIcon icon={icon} text="Click Me" />
 */
function ButtonWithIcon({ icon, text }) {
  return (
    <button className="btn">
      <div className="btn-content">
        <img src={icon} alt="" id="more-btn" loading="lazy" />
        {text}
      </div>
    </button>
  );
}

export default ButtonWithIcon;
