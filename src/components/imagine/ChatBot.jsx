import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../../utils/motion";
import { chatBotSocket } from "../../backend/geminiAPI";
import sendIcon from "../../images/send.png";
import CircularProgress from "@mui/material/CircularProgress";

function ChatBot({ showChatBot }) {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

  const [isSentClicked, setIsSentClicked] = useState(false);

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
      const chatSocket = chatBotSocket(setMessages, pendingMessage);

      return () => {
        chatSocket.close(); // Clean up the WebSocket connection on component unmount
      };
    }
  }, [isConnected, pendingMessage]); // Re-run effect if isConnected or pendingMessage changes

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && initialMessage.trim()) {
      // Set the pending message and connect to WebSocket
      setPendingMessage(initialMessage);
      setIsConnected(true);

      // Reset the message input after setting pendingMessage
      setInitialMessage("");
    }
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
          <motion.h1 className="chatbot-title">Brainstorm prompts</motion.h1>
          <hr />
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className="chatbot-message">
                {/* Question */}
                <div className="question">
                  <p>{message.message}</p>
                </div>
                {/* Answer */}
                <div className="answer">
                  <p>{message.answer}</p>
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
                onClick={() => handleSendIconClick()}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatBot;
