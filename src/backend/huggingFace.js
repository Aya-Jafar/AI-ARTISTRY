import { HfInference } from "@huggingface/inference";

const generateArt = async (setGeneratedImage, prompt, setError) => {
  const huggingFace = new HfInference(process.env.REACT_APP_HF_TOKEN);
  const model = "Lykon/art-diffusion-xl-0.9";

  try {
    const response = await huggingFace.textToImage({
      data: prompt.trim(),
      model: model,
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
    setError("An error occurred, Please try again");
  }
};

export default generateArt;
