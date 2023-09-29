import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slideAnimation } from "../utils/motion";
import AuthContext from "../providers/Auth";
import { Skeleton } from "@mui/material";
import generateArt from "../backend/huggingFace";
import CustomizationSliders from "../components/imagine/Customization";
import { saveGeneratedImage } from "../backend/data";
import ImagineGrid from "../components/imagine/ImagineGrid";
import GeneratedImage from "../components/imagine/GeneratedImage";


function Imagine() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [generatedImage, setGeneratedImage] = useState("");

  const [customOptions, setCustomOptions] = useState({
    brightness: 100,
    contrast: 100,
  });

  // useEffect(() => {
  //   console.log(generatedImage);
  // }, [generatedImage]);

  const hangleGenerateClick = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    if (currentUser) {
      try {
        await generateArt(setGeneratedImage, prompt);
      } catch (e) {
        console.log(e);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="imagine-container"
      >
        <div className="prompt-section">
          <motion.h1 {...slideAnimation("left")}>
            Imagine Tomorrow, Create Today
          </motion.h1>
          <textarea
            type="text"
            name=""
            id=""
            placeholder="Write your prompt here..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <br />

          <button
            className="btn"
            id="imagine-btn"
            onClick={(e) => hangleGenerateClick(e)}
          >
            Generate
          </button>
          {generatedImage && (
            <>
              <CustomizationSliders
                option="Brightness"
                setOption={setCustomOptions}
              />
              <CustomizationSliders
                option="Contrast"
                setOption={setCustomOptions}
              />
              <div className="artwork-detail-btn" id="imagine-custome-btns">
                <button className="btn">Post</button>
                <button
                  className="btn"
                  onClick={() =>
                    saveGeneratedImage(currentUser, generatedImage, prompt)
                  }
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        <div className="image-section">
          {!isClicked ? (
            <ImagineGrid />
          ) : (
            <>
              {generatedImage ? (
                <GeneratedImage
                  generatedImage={generatedImage}
                  customOptions={customOptions}
                />
              ) : (
                <Skeleton
                  sx={{ bgcolor: "grey.700" }}
                  variant="rectangular"
                  width={600}
                  height={600}
                />
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Imagine;
