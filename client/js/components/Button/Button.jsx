import React from "react";

import { func, string } from "prop-types";

const propTypes = {
  buttonText: string,
  btnClassList: string,
  roll: func
};


const Button = (props) => {
  const { btnClassList, buttonText, roll } = props;

  const handleRoll = () => {
    if (roll) {
      roll(false);
    }
  };

  return( <button className={btnClassList} onClick={handleRoll}>{ buttonText }</button>);
};

Button.propTypes = propTypes;

export default Button;
