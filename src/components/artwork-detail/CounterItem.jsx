import React from "react";

function CounterItem({ counterIcon, countesNumber }) {
  return (
    <div className="counter-item">
      <img src={counterIcon} alt="" />
      <h3>{countesNumber}</h3>
    </div>
  );
}

export default CounterItem;
