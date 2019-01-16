import PropTypes from "prop-types";
import React from "react";
import Die from "./Die.jsx";

const Dice = (props) => {
  const { dice, handleDieHold } = props;

  return(
    <div className="dice">
      { dice.map( (die, index) => <Die key={index} handleDieHold={ handleDieHold } {...die} /> ) }
    </div>
  );
};

const { array, func } = PropTypes;

Dice.propTypes = {
  dice: array,
  handleDieHold: func.isRequired
};

export default Dice;
