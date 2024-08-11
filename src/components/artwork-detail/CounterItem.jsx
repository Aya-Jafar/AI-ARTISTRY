import React from "react";

function CounterItem({ counterIcon:Icon, countesNumber }) {
  return (
    <div className="counter-item">
      <Icon />
      <h3>{countesNumber}</h3>
    </div>
  );
}

export default CounterItem;
