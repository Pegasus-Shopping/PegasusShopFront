import React, { useState } from "react";
import PropTypes from "prop-types";

// Passes in helpfulCOunter and incrementCounter. Allows user the option to click yes if the
// review was helpful, and if it was it would incrememnt the helpfulCounter and remove the ability
// to click yes again.
function Helpful(props) {
  const [isYes, setYes] = useState(false);
  const { helpfulCounter } = props;
  const { incrementCounter } = props;

  function onClick() {
    incrementCounter();
    setYes(true);
  }

  function onHandleKeyDown() {
    onClick();
  }

  if (!isYes) {
    return (
      <div>
        <span>Helpful? </span>
        <u onClick={onClick} onKeyDown={onHandleKeyDown} role="link" tabIndex={0}>
          Yes
        </u>
        <span>
          (
          {helpfulCounter}
          )
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>Helpful? </span>
      <span>
        (
        {helpfulCounter}
        )
      </span>
    </div>
  );
}

Helpful.propTypes = {
  helpfulCounter: PropTypes.number.isRequired,
  incrementCounter: PropTypes.func.isRequired,
};

export default Helpful;
