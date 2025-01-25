import React, { useState } from "react";
import { CustomSlider } from "../../utils/formaters";

/**
 * @component
 * @description
 * The CustomizationSliders component renders a slider for customizing options such as brightness and contrast.
 * It takes in the `option` prop to determine the type of customization (e.g., "Brightness" or "Contrast")
 * and provides a slider interface for adjusting values within a specified range.
 * The component updates the parent state through the `setOption` callback, which modifies
 * the customization settings based on the selected option.
 *
 * @example
 * <CustomizationSliders option="Brightness" setOption={setCustomOptions} />
 *
 * @param {Object} props
 * @param {string} props.option - The customization option (e.g., "Brightness" or "Contrast").
 * @param {Function} props.setOption - Callback function to update customization settings in the parent component.
 */

function CustomizationSliders({ option, setOption }) {
  /**
   * @function handleSliderChange
   * @description
   * Handles the slider change event and updates the customization option in the parent state.
   * It creates a new object based on the previous state, updating the value for the specific option (e.g., brightness).
   *
   * @param {number} newValue - The new value selected on the slider.
   */
  const handleSliderChange = (newValue) => {
    setOption((prevCustomOptions) => ({
      ...prevCustomOptions,
      [option.toLowerCase()]: newValue,
    }));
  };

  return (
    <div className="customization-options">
      <div className="customization-option">
        <p>{option}</p>
        <CustomSlider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          size="medium"
          min={10}
          max={300}
          onChange={(event, newValue) => handleSliderChange(newValue)}
        />
      </div>
    </div>
  );
}

export default CustomizationSliders;
