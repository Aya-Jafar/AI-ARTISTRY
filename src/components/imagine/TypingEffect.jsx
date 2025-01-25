import React, { useState, useEffect } from "react";
import { makeNamesBold } from "../../utils/formaters";

/**
 * @component
 * @description
 * The `TypingEffect` component simulates typing text with a delay for each character.
 * It gradually displays characters from the provided `text` prop, adding a typing effect to it.
 * Additionally, it formats names (defined as two capitalized words separated by a space) in bold.
 *
 * - The text is displayed one character at a time, with an adjustable speed defined by the timeout duration.
 * - Names in the text (matched by the regex pattern for capitalized first and last names) are rendered in bold.
 *
 * @param {string} text - The text that will be displayed with the typing effect.
 *
 * @example
 * <TypingEffect text="Hello John Doe, how are you?" />
 * // This will type out "Hello" and then bold "John Doe", followed by the rest of the sentence.
 */
export default function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  /**
   * @effect
   * @description
   * The `useEffect` hook manages the typing animation by gradually adding one character to the `displayText`
   * state at a time. This simulates typing the provided `text` string.
   * The effect triggers on every change of the `index` and `text` variables.
   *
   * - A timer is set to add one character from `text` to `displayText` every 100 milliseconds.
   * - The timer is cleared when the component unmounts or when the `index` reaches the end of the text.
   *
   * @dependencies [index, text]
   */
  useEffect(() => {
    if (text && index < text?.length) {
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
