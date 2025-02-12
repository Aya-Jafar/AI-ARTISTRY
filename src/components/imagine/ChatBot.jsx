import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { popupVariants } from "../../utils/motion";
import { chatBotSocket } from "../../backend/gemini";
import CircularProgress from "@mui/material/CircularProgress";
import TypingEffect from "./TypingEffect";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ArrowUpRight } from "lucide-react";

/**
 * @component
 * @description
 * The `ChatBot` component renders a chat interface for brainstorming prompts. It connects to a WebSocket
 * to handle real-time communication and allows the user to send and receive messages. It also provides
 * recommended messages for the user to choose from.
 *
 * @param {Object} props
 * @param {boolean} props.showChatBot - Determines whether the chatbot is visible.
 * @param {Function} props.setShowChatBot - A function to control the visibility of the chatbot.
 * @param {Function} props.setPrompt - A function to update the prompt for the chatbot.
 *
 * @example
 * <ChatBot showChatBot={true} setShowChatBot={setShowChatBot} setPrompt={setPrompt} />
 */
function ChatBot({ showChatBot, setShowChatBot, setPrompt }) {
  /**
   * @constant RECOMMENDED_MESSAGES
   * @description
   * A list of predefined prompt ideas recommended for the user.
   */
  const RECOMMENDED_MESSAGES = [
    "Give me a creative prompt for image generation about space",
    "Creative image generation prompts",
    "Fantasy world scene idea",
  ];
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const [isSentClicked, setIsSentClicked] = useState(false);
  const [recommendedMessages, setRecommendedMessages] = useState([
    ...RECOMMENDED_MESSAGES,
  ]);
  const [initialMessageNotSent, setInitialMessageNotSent] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const chatSocketRef = useRef(null);
  const selectedTextRef = useRef("");
  const selectedTextIndexRef = useRef(null); // Ref to manage selected message index
  const iconVisibleRef = useRef(false); // Ref to manage icon visibility

  /**
   * @effect
   * @description
   * Handles the WebSocket connection to the chatbot server. The connection is established when the chatbot is shown and closed when it's hidden.
   * @dependencies [showChatBot]
   */
  useEffect(() => {
    if (showChatBot) {
      // Reset states when chatbot is reopened
      setMessages([]); // Clear old messages
      setPendingMessage(""); // Clear pending message
      setInitialMessage(""); // Reset input
      setRecommendedMessages([...RECOMMENDED_MESSAGES]); // Reset recommendations
      setInitialMessageNotSent(true); // Reset to show recommendations

      if (!isConnected) {
        setIsConnected(true); // Establish connection
      }
    } else if (chatSocketRef.current) {
      chatSocketRef.current.close();
      setIsConnected(false); // Clean up connection
    }
  }, [showChatBot]);

  /**
   * @effect
   * @description
   * Handles the WebSocket connection to the chatbot server. The connection is established when the chatbot is shown and closed when it's hidden.
   * @dependencies [showChatBot]
   */
  useEffect(() => {
    if (isConnected && pendingMessage) {
      chatSocketRef.current = chatBotSocket(setMessages, pendingMessage);

      return () => {
        if (chatSocketRef.current) {
          chatSocketRef.current.close();
        }
      };
    }
  }, [isConnected, pendingMessage]);

  /**
   * @function handleCloseChatBot
   * @description
   * Closes the chatbot, cleaning up WebSocket connections and resetting the states.
   */
  const handleCloseChatBot = () => {
    if (chatSocketRef.current) {
      chatSocketRef.current.close();
    }
    setIsConnected(false);
    setShowChatBot(false);
    setMessages([]);
    setRecommendedMessages([...RECOMMENDED_MESSAGES]);
  };

  /**
   * @function sendInitialMessage
   * @description
   * Sends a predefined or user-selected message as the initial prompt to the chatbot.
   * @param {string} chosenText - The message to be sent.
   */
  const sendInitialMessage = (chosenText) => {
    setInitialMessageNotSent(false);
    setPendingMessage(chosenText);
    setIsConnected(true);
    setInitialMessage("");

    setTimeout(() => {
      setIsSentClicked(false);
    }, 3000);
  };

  /**
   * @function handleSendMessage
   * @description
   * Handles the sending of messages when the send button is clicked or the Enter key is pressed.
   * - Validates if the initial message is not empty.
   * @param {Event} event - The event triggered by the click or key press.
   */
  const handleSendMessage = (event) => {
    if (
      (event.type === "click" || event.key === "Enter") &&
      initialMessage.trim()
    ) {
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

  /**
   * @function onSelectStart
   * @description
   * Hides the prompt icon when the text selection starts.
   */
  const onSelectStart = () => (iconVisibleRef.current = false); // Hide the icon on selection start

  /**
   * @function handleSelectionChange
   * @description
   * Handles the selection of text in the chat and positions the prompt icon accordingly.
   * @param {number} index - The index of the selected message in the chat history.
   */
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

  /**
   * @function insertPrompt
   * @description
   * Inserts the selected text into the prompt field when the prompt icon is clicked.
   */
  const insertPrompt = () => {
    const textToInsert = selectedTextRef.current;

    if (textToInsert.trim().length > 0) {
      setPrompt(textToInsert);
      selectedTextRef.current = "";
      iconVisibleRef.current = false; // Hide the icon
      selectedTextIndexRef.current = null;
    }
  };

  /**
   * @function handleMouseUp
   * @description
   * Handles mouse release event to show the prompt icon if text is selected.
   */
  const handleMouseUp = () => {
    const text = selectedTextRef.current;
    if (text && text.length > 0) {
      iconVisibleRef.current = true; // Show the icon
    }
  };

  /**
   * @effect
   * @description
   * Adds event listeners for text selection and mouseup to manage prompt icon visibility and positioning.
   * @dependencies [iconVisibleRef.current]
   */
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
              <img
                src="/close.png"
                alt="Close Chatbot"
                id="chatbot-close"
                loading="lazy"
              />
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
                        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
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
              onKeyPress={handleSendMessage}
              placeholder="Write an initial prompt..."
            />

            {isSentClicked ? (
              <CircularProgress
                className="comment-progress-indicator"
                size="35px"
              />
            ) : (
              <img
                loading="lazy"
                src={"/send.png"}
                alt="Comment Icon"
                className="comment-icon"
                id="send-icon-in-chatbot"
                onClick={handleSendMessage}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatBot;
