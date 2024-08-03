import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../../utils/motion";
import { chatBotSocket } from "../../backend/geminiAPI";

function ChatBot({ showChatBot }) {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

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
          <hr
            style={{
              width: "100%",
              backgroundColor: "rgb(99, 99, 99)",
              height: "1px",
              border: "none",
            }}
          />

          <input
            id="chatbot-input"
            type="text"
            value={initialMessage}
            onChange={(e) => setInitialMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your initial message"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatBot;
