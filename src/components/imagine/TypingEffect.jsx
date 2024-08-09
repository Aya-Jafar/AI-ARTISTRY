import React, { useState, useEffect } from "react";

export default function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  // Function to render text with formatting
  const makeNamesBold = (text) => {
    // Define the regex pattern for bold names
    const highlightPattern = /\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g; // Example pattern for names

    const parts = text.split(new RegExp(`(${highlightPattern.source})`, "g"));

    return parts.map((part, idx) =>
      idx % 2 === 0 ? (
        part // Regular text
      ) : (
        <strong key={idx} style={{ fontWeight: "bold" }}>
          {part}
        </strong> // bold text
      )
    );
  };

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100); // Adjust the speed here

      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <span className="typing-effect" style={{ whiteSpace: "pre-wrap" }}>
      {makeNamesBold(displayText)}
    </span>
  );
}
