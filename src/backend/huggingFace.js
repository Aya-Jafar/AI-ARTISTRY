import { HfInference } from "@huggingface/inference";
import { HF_MODEL } from "../utils/constants";

/**
 * Generates artwork based on the provided prompt using Hugging Face's text-to-image model.
 * @param {function} setGeneratedImage - A function to update the generated image state.
 * @param {string} prompt - The prompt for generating the artwork.
 * @param {function} setError - A function to update the error state if an error occurs.
 * @returns {Promise<void>} - A promise that resolves when the image generation is complete or fails.
 */
const generateArt = async (setGeneratedImage, prompt, setError) => {
  const huggingFace = new HfInference(process.env.REACT_APP_HF_TOKEN);

  try {
    const response = await huggingFace.textToImage({
      data: prompt.trim(),
      model: HF_MODEL,
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const myDataUrl = e.target.result;
      setGeneratedImage(myDataUrl);
    };
    reader.readAsDataURL(response);

    // setGeneratedImage(response);
  } catch (error) {
    console.error("Error making API request:", error);
    // setError("An error occurred, Please try again");
  }
};

export default generateArt;
