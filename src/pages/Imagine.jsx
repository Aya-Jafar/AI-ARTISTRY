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
import { CircularProgress, Tooltip } from "@mui/material";
import ChatBot from "../components/imagine/ChatBot";
import chatBotInitIcon from "../images/chatbot-init.png";
import { getArtistsNameWithSimilarWork } from "../backend/gemini";
import TypingEffect from "../components/imagine/TypingEffect";

function Imagine() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showChatBot, setShowChatBot] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [artists, setArtists] = useState([]);

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

  const getArtists = async (e) => {
    e.preventDefault();

    if (generatedImage) {
      await getArtistsNameWithSimilarWork(generatedImage, setArtists);
    }
  };

  const tempArtists = [
    "Here are some artists who have created similar works of art:",

    "Antonio Canova (1757-1822) was an Italian sculptor known for his neoclassical style. He is known for his sculptures of angels and mythological figures.",
    "Bertel Thorvaldsen (1770-1844) was a Danish sculptor who was also known for his neoclassical style. He is known for his sculptures of angels, mythological figures, and religious figures.",
  ];

  return (
    <>
      <audio autoPlay loop>
        <source
          src={require("../components/imagine/imagine.m4a")}
          type="audio/mpeg"
        />
      </audio>

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
            <Tooltip title="Brainstorm prompts ideas" placement="right">
              <div className="chat-circle" onClick={() => setShowChatBot(true)}>
                <img
                  src={chatBotInitIcon}
                  alt=""
                  className="icon-fit-container"
                />
              </div>
            </Tooltip>
            <ChatBot
              showChatBot={showChatBot}
              setShowChatBot={setShowChatBot}
            />
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

        <CustomAlert message="Artwork added successfully" />

        <div className="image-section">
          {!isClicked && !generatedImage ? (
            <>
              <ImagineGrid />
            </>
          ) : (
            <>
              {generatedImage ? (
                <>
                  <GeneratedImage
                    generatedImage={generatedImage}
                    customOptions={customOptions}
                  />
                  <div className="gemni-btns">
                    <button
                      id="get-artist-names-btn"
                      onClick={(e) => getArtists(e)}
                    >
                      {artists.length === 0 ? (
                        <>Get artists names with similar work</>
                      ) : (
                        <div className="loading-btn-with-text">
                          <>Get artists names with similar work</>
                          <CircularProgress size={20} />
                        </div>
                      )}
                    </button>
                    <button id="get-artist-names-btn">
                      Chat about the generated artwork
                    </button>
                  </div>
                  <div style={{ paddingBottom: "70px", marginTop: "40px" }}>
                    {artists.length > 0 && (
                      <p>
                        <TypingEffect text={artists.join("\n\n")} />
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="progress-bg">
                  <div className="grid-container">
                    <ImagineGrid />
                  </div>

                  <CustomizedProgressBars />
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
      {/* <footer className="footer-copywrite">
        <div class="song-copyright">
          &copy; Imagine-John Lennon. All rights reserved.
        </div>
      </footer> */}
    </>
  );
}

export default Imagine;
