import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../../utils/motion";
import { chatBotSocket } from "../../backend/gemini";
import sendIcon from "../../images/send.png";
import CircularProgress from "@mui/material/CircularProgress";
import closeIcon from "../../images/close.png";
import TypingEffect from "./TypingEffect";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function ChatBot({ showChatBot, setShowChatBot }) {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [isSentClicked, setIsSentClicked] = useState(false);
  const recommendedMessages = [
    "Give me a creative prompt for image generation about space",
    "Creative image generation prompts",
    "Fantasy world scene idea",
  ];
  const [initialMessageNotSent, setInitialMessageNotSent] = useState(true);

  const chatSocketRef = useRef(null); // Use a ref to store the WebSocket instance

  const handleSendIconClick = () => {
    if (initialMessage.trim()) {
      setIsSentClicked(true); // Set loading state
      setPendingMessage(initialMessage);
      setIsConnected(true);

      // Reset the message input after setting pendingMessage
      setInitialMessage("");

      // Remove loading state after the timeout
      setTimeout(() => {
        setIsSentClicked(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isConnected) {
      chatSocketRef.current = chatBotSocket(setMessages, pendingMessage); // Store WebSocket instance in ref

      return () => {
        chatSocketRef.current.close(); // Clean up the WebSocket connection on component unmount
      };
    }
  }, [isConnected, pendingMessage]); // Re-run effect if isConnected or pendingMessage changes

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && initialMessage.trim()) {
      setIsSentClicked(true); // Set loading state

      // Set the pending message and connect to WebSocket
      setPendingMessage(initialMessage);
      setIsConnected(true);

      // Reset the message input after setting pendingMessage
      setInitialMessage("");

      setTimeout(() => {
        setIsSentClicked(false);
      }, 3000);
    }
  };

  const handleCloseChatBot = () => {
    if (chatSocketRef.current) {
      chatSocketRef.current.close(); // Close WebSocket connection
    }
    setIsConnected(false); // Reset connection state
    setShowChatBot(false);
  };

  const sendInitialMessage = (chosenText) => {
    setInitialMessageNotSent(false);
    setPendingMessage(chosenText);
    setIsConnected(true);
    setInitialMessage("");

    setTimeout(() => {
      setIsSentClicked(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {showChatBot && (
        <motion.div
          className="chatbot-container"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={popupVariants}
        >
          <div className="chatbot-header">
            <motion.h1 className="chatbot-title">Brainstorm prompts</motion.h1>
            <div
              className="close-btn"
              onClick={handleCloseChatBot} // Close the chatbot and WebSocket connection
            >
              <img src={closeIcon} alt="Close Chatbot" id="chatbot-close" />
            </div>
          </div>
          <hr />
          {/* <p>Hi 👋</p> */}
          {initialMessageNotSent && (
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{
                padding: "0px 12px",
                marginTop: "3px",
              }}
            >
              {recommendedMessages.map((recommendedMessage) => (
                <Chip
                  key={recommendedMessage} // Add a unique key for each chip
                  label={recommendedMessage}
                  variant="outlined"
                  color="info"
                  onClick={() => sendInitialMessage(recommendedMessage)}
                  style={{ marginBottom: 10 }}
                  sx={{
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                      borderColor: "#50D5FF",
                      color: "#50D5FF",
                    },
                  }}
                />
              ))}
            </Stack>
          )}

          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className="chatbot-message">
                <div className="question">
                  <p>{message.message}</p>
                </div>
                {/* TODO: Add Insert icon to insert it into the text area again*/}
                <div className="answer">
                  <TypingEffect text={message.answer} />
                </div>
              </div>
            ))}
          </div>
          <hr />

          <div className="chat-input-container">
            <input
              id="chatbot-input"
              type="text"
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write an initial prompt..."
            />

            {isSentClicked ? (
              <CircularProgress
                className="comment-progress-indicator"
                size="35px"
              />
            ) : (
              <img
                src={sendIcon}
                alt="Comment Icon"
                className="comment-icon"
                id="send-icon-in-chatbot"
                onClick={handleSendIconClick}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatBot;
