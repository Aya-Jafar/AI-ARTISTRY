import React from "react";


/**
 * @component
 * @description
 * The GeneratedImage component displays an image generated from a prompt. 
 * It applies customization settings like brightness and contrast based on the passed `customOptions` prop.
 * The image's `src` is determined by the `generatedImage` prop, and the styles are dynamically set
 * to adjust brightness and contrast based on the `customOptions`.
 * 
 * @example
 * <GeneratedImage generatedImage={imageUrl} customOptions={{ brightness: 120, contrast: 100 }} />
 * 
 * @param {Object} props
 * @param {string} props.generatedImage - The URL of the generated image to be displayed.
 * @param {Object} props.customOptions - The customization settings for the image.
 * @param {number} props.customOptions.brightness - The brightness setting for the image (percentage).
 * @param {number} props.customOptions.contrast - The contrast setting for the image (percentage).
 */
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
