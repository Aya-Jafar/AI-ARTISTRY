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
import { ArrowUpRight } from "lucide-react";

function ChatBot({ showChatBot, setShowChatBot, setPrompt }) {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [isSentClicked, setIsSentClicked] = useState(false);
  const [recommendedMessages, setRecommendedMessages] = useState([
    "Give me a creative prompt for image generation about space",
    "Creative image generation prompts",
    "Fantasy world scene idea",
  ]);
  const [initialMessageNotSent, setInitialMessageNotSent] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const chatSocketRef = useRef(null);
  const selectedTextRef = useRef("");
  const selectedTextIndexRef = useRef(null); // Ref to manage selected message index
  const iconVisibleRef = useRef(false); // Ref to manage icon visibility

  // Handle send icon click
  const handleSendIconClick = () => {
    if (initialMessage.trim()) {
      setIsSentClicked(true);
      setPendingMessage(initialMessage);
      setIsConnected(true);
      setInitialMessage("");
      setRecommendedMessages([]);

      setTimeout(() => {
        setIsSentClicked(false);
      }, 3000);
    }
  };

  // Handle WebSocket connection
  useEffect(() => {
    if (isConnected) {
      chatSocketRef.current = chatBotSocket(setMessages, pendingMessage);

      return () => {
        chatSocketRef.current.close();
      };
    }
  }, [isConnected, pendingMessage]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && initialMessage.trim()) {
      setIsSentClicked(true);
      setPendingMessage(initialMessage);
      setIsConnected(true);
      setRecommendedMessages([]);
      setInitialMessage("");

      setTimeout(() => {
        setIsSentClicked(false);
      }, 3000);
    }
  };

  // Handle closing the chatbot
  const handleCloseChatBot = () => {
    if (chatSocketRef.current) {
      chatSocketRef.current.close();
    }
    setIsConnected(false);
    setShowChatBot(false);
    setMessages([]);
    setRecommendedMessages([
      "Give me a creative prompt for image generation about space",
      "Creative image generation prompts",
      "Fantasy world scene idea",
    ]);
  };

  // Send initial message
  const sendInitialMessage = (chosenText) => {
    setInitialMessageNotSent(false);
    setPendingMessage(chosenText);
    setIsConnected(true);
    setInitialMessage("");

    setTimeout(() => {
      setIsSentClicked(false);
    }, 3000);
  };

  const onSelectStart = () => {
    iconVisibleRef.current = false; // Hide the icon on selection start
  };

  const handleSelectionChange = (index) => {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString().trim();

    if (!activeSelection || !text) {
      iconVisibleRef.current = false; // Hide the icon
      selectedTextIndexRef.current = null;
      const iconElement = document.querySelector("#icon");
      if (iconElement) {
        iconElement.style.display = "none";
      }
      return;
    }
    selectedTextRef.current = text;
    selectedTextIndexRef.current = index;

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2 - 35,
      y: rect.top + window.scrollY - 640,
    });

    iconVisibleRef.current = true; // Show the icon
  };

  const insertPrompt = () => {
    const textToInsert = selectedTextRef.current;

    if (textToInsert.trim().length > 0) {
      setPrompt(textToInsert);
      selectedTextRef.current = "";
      iconVisibleRef.current = false; // Hide the icon
      selectedTextIndexRef.current = null;
    }
  };

  const handleMouseUp = () => {
    const text = selectedTextRef.current;
    if (text && text.length > 0) {
      iconVisibleRef.current = true; // Show the icon
    }
  };
  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleMouseUp);
      iconVisibleRef.current = false;
    };
  }, [iconVisibleRef.current]);

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
            <div className="close-btn" onClick={handleCloseChatBot}>
              <img src={closeIcon} alt="Close Chatbot" id="chatbot-close" />
            </div>
          </div>
          <hr />

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
                  key={recommendedMessage}
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
              <div
                key={index}
                className="chatbot-message"
                onMouseUp={() => handleSelectionChange(index)}
                onMouseDown={onSelectStart}
                style={{ position: "relative" }}
              >
                <div className="question">
                  <p>{message.message}</p>
                </div>

                <div className="answer">
                  {selectedTextIndexRef.current === index && (
                    <div
                      onClick={insertPrompt}
                      id="icon"
                      style={{
                        position: "absolute",
                        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                        cursor: "pointer",
                        zIndex: 9999,
                        display: iconVisibleRef?.current ? "block" : "none",
                      }}
                    >
                      <ArrowUpRight className="corner-right-up" />
                    </div>
                  )}
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
