import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slideAnimation } from "../utils/motion";
import AuthContext from "../providers/Auth";
import generateArt from "../backend/huggingFace";
import CustomizationSliders from "../components/imagine/Customization";
import { saveGeneratedImage, postArtwork } from "../backend/data";
import ImagineGrid from "../components/imagine/ImagineGrid";
import GeneratedImage from "../components/imagine/GeneratedImage";
import getRandomPropmt from "../backend/prompts";
import CustomizedProgressBars from "../components/imagine/Loading";
import AlertContext from "../providers/Alert";
import CustomAlert from "../components/common/CustomAlert";

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

  const { showSnackBar, setShowSnackBar } = useContext(AlertContext);

  const hangleGenerateClick = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    try {
      await generateArt(setGeneratedImage, prompt);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <audio autoPlay loop>
        <source
          src={require("../components/imagine/imagine.m4a")}
          type="audio/mpeg"
        />
      </audio>
      {true && (
          <CustomAlert message="Artwork added successfully" />
        )}

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
            placeholder="Write your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <br />
          <div className="imagine-btns">
            <button
              className="btn"
              id="random-prompt-btn"
              onClick={() => {
                const randomPrompt = getRandomPropmt();
                setPrompt(randomPrompt);
              }}
            >
              Random prompt
            </button>

            <button
              className="btn"
              id="imagine-btn"
              onClick={(e) => hangleGenerateClick(e)}
            >
              Generate
            </button>
          </div>

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
                <button
                  className="btn"
                  onClick={() =>
                    postArtwork(
                      currentUser,
                      generatedImage,
                      prompt,
                      navigate,
                      setShowSnackBar
                    )
                  }
                >
                  Post
                </button>

                <button
                  className="btn"
                  onClick={() =>
                    saveGeneratedImage(
                      currentUser,
                      generatedImage,
                      prompt,
                      customOptions.brightness,
                      customOptions.contrast,
                      navigate,
                      setShowSnackBar
                    )
                  }
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        {/* !isClicked  && !generatedImage */}
        <div className="image-section">
          {!isClicked && !generatedImage ? (
            <>
              <ImagineGrid />
            </>
          ) : (
            <>
              {generatedImage ? (
                <GeneratedImage
                  generatedImage={generatedImage}
                  customOptions={customOptions}
                />
              ) : (
                <div className="progress-bg">
                  <div className="grid-container">
                    <ImagineGrid />
                  </div>

                  <CustomizedProgressBars />
                </div>
                // <>
                //   <h1 class="title">This may take a while...</h1>
                //   <div class="rainbow-marker-loader"></div>
                // </>
              )}
            </>
          )}
        </div>
      </motion.div>
      <footer className="footer-copywrite">
        <div class="song-copyright">
          &copy; Imagine-John Lennon. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Imagine;
