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
import { getArtistsNameWithSimilarWork } from "../backend/gemini";
import TypingEffect from "../components/imagine/TypingEffect";
import AuthPopupContext from "../providers/AuthPopup";

/**
 * @component
 * @description
 * The Imagine component allows users to generate AI-driven images based on prompts.
 * It integrates with user authentication via the AuthContext and uses a navigation hook for routing.
 * The component features state management for user interactions, including:
 * - `prompt` input for the image generation request.
 * - Error handling for empty prompts and API issues.
 * - Display of a generated image.
 * - Loading and error states for user feedback.
 * Additional functionality includes toggling a chatbot interface and managing a list of artists.
 * @example
 * <Imagine />
 */
function Imagine() {
  /**
   * @description
   * This section of the Imagine component contains state variables, context hooks,
   * and core functionality for handling user interactions, image generation,
   *  and artist recommendations.
   **/
  const { currentUser } = useContext(AuthContext);
  const [isClicked, setIsClicked] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showChatBot, setShowChatBot] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyPromptError, setEmptyPromptError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [customOptions, setCustomOptions] = useState({
    brightness: 100,
    contrast: 100,
  });
  const { setShowSnackBar } = useContext(AlertContext);
  const { loginPopup, signupPopup, setLoginPopup } =
    useContext(AuthPopupContext);
  const isBlured = loginPopup || signupPopup;

  /**
   * @function hangleGenerateClick
   * @description
   * Handles the "Generate" button click event to generate an image.
   * - Marks the button as clicked.
   * - Calls the `generateArt` function with the user's prompt.
   * - Logs any errors that occur.
   * @param {Event} e - The click event.
   */
  const hangleGenerateClick = async (e) => {
    e.preventDefault();
    // Check if the prompt is empty and prevent action
    if (!prompt || prompt.trim().length === 0) {
      setEmptyPromptError("Please type a prompt");
      return; // Stop execution if prompt is empty
    }

    setIsClicked(true);
    setGeneratedImage(""); // Reset previous image before generating a new one

    try {
      await generateArt(setGeneratedImage, prompt, setError);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @function getArtists
   * @description
   * Fetches a list of artists with similar works to the generated image.
   * - Sets loading state during the API call.
   * - Calls the `getArtistsNameWithSimilarWork` function with the generated image.
   * - Updates the artists list and loading state.
   * @param {Event} e - The click event.
   */
  const getArtists = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (generatedImage) {
      await getArtistsNameWithSimilarWork(generatedImage, setArtists);
    }
    setIsLoading(false);
  };

  /**
   * @effect
   * @description
   * Validates the `prompt` field and updates the error message.
   * - Sets `emptyPromptError` if the prompt is empty or contains only whitespace.
   * - Clears the error if the prompt is valid.
   * @dependencies [prompt, isTouched]
   */
  useEffect(() => {
    if (isTouched && (!prompt || prompt.trim().length === 0)) {
      setEmptyPromptError("Please type a prompt");
    } else {
      setEmptyPromptError(null);
    }
  }, [prompt, isTouched]);

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
        className={`imagine-container ${isBlured ? "blur-background" : ""}`}
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
            onBlur={() => setIsTouched(true)}
            style={{
              border:
                emptyPromptError !== null ? "2px solid rgb(248, 92, 92)" : "",
            }}
          />
          {emptyPromptError && (
            <div style={{ color: "rgb(248, 92, 92)" }}>{emptyPromptError}</div>
          )}

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
                  loading="lazy"
                  src={"/chatbot-init.png"}
                  alt=""
                  className="icon-fit-container"
                />
              </div>
            </Tooltip>
            <ChatBot
              showChatBot={showChatBot}
              setShowChatBot={setShowChatBot}
              setPrompt={setPrompt}
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
                  onClick={() => {
                    if (currentUser && currentUser?.uid) {
                      postArtwork(
                        currentUser,
                        generatedImage,
                        prompt,
                        setShowSnackBar
                      );
                    } else {
                      setLoginPopup(true);
                    }
                  }}
                >
                  Post
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    if (currentUser && currentUser?.uid) {
                      saveGeneratedImage(
                        currentUser,
                        generatedImage,
                        prompt,
                        customOptions.brightness,
                        customOptions.contrast,
                        setShowSnackBar
                      );
                    } else {
                      setLoginPopup(true);
                    }
                  }}
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
                      {!isLoading ? (
                        <>Get artists names with similar work</>
                      ) : (
                        <div className="loading-btn-with-text">
                          <>Get artists names with similar work</>
                          <CircularProgress size={20} />
                        </div>
                      )}
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

                  <CustomizedProgressBars error={error} />
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Imagine;
