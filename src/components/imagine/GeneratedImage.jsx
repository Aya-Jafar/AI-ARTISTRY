import React from "react";

function GeneratedImage({ generatedImage, customOptions }) {
  return (
    <img
      src={generatedImage}
      alt="placeholder..."
      className="generated-img"
      style={{
        filter: `brightness(${customOptions.brightness}%) contrast(${customOptions.contrast}%)`,
      }}
    />
  );
}

export default GeneratedImage;
