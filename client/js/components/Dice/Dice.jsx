import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Die from "./Die.jsx";

const Dice = (props) => {
  const { dice, handleDieHold } = props;

  return(
    <div className="dice">
      { dice.map((die, i) => <Die key={i} handleDieHold={ handleDieHold } { ...die } /> )}
    </div>
  );
};

const { array, func } = PropTypes;

Dice.propTypes= {
  dice: array.isRequired,
  handleDieHold: func.isRequired
};

export default Dice;
