import React from "react";

/**
 * @component
 * @description
 * The `Quote` component renders a quote section that includes a blockquote with a famous quote
 * and the attribution to the author. The section is styled to take up 60% of the viewport height.
 *
 * @example
 * <Quote />
 *
 */
function Quote() {
  return (
    <div style={{ height: "60vh" }} className="quote">
      <h1>
        <blockquote>
          The function of art is to hold a mirror up to nature
        </blockquote>
      </h1>
      <p>-Douglas Adams</p>
    </div>
  );
}

export default Quote;
