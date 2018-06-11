import React from "react";

import Die from "./Die.jsx";

import { array, func } from "prop-types";

const propTypes = {
  dice: array,
  handleDieHold: func.isRequired
};


const Dice = (props) => {
  const { dice, handleDieHold } = props;

  return(
    <div className="dice">
      { dice.map( (die, index) => <Die key={index} handleDieHold={ handleDieHold } {...die} /> ) }
    </div>
  );
};

Dice.propTypes = propTypes;

export default Dice;
