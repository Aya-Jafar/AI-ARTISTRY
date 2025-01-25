import React from "react";

/**
 * @description
 * The `CounterItem` component displays a counter with an icon and a number.
 * It receives a counter icon and the counter's number as props.
 * The component renders the icon followed by the number value.
 */
function CounterItem({ counterIcon: Icon, countesNumber }) {
  return (
    <div className="counter-item">
      <Icon />
      <h3>{countesNumber}</h3>
    </div>
  );
}

export default CounterItem;
