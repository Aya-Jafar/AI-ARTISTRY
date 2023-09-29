import React, { useState } from "react";
import { CustomSlider } from "../../utils/styleSetter";

function CustomizationSliders({
  option,
  setOption,
}) {
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
