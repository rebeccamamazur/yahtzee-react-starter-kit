import PropTypes from "prop-types";
import React from "react";


const Button = (props) => {
  const { btnClassList, buttonText, roll } = props;

  const handleRoll = () => {
    if (roll) {
      roll(false);
    }
  };

  return( <button className={btnClassList} onClick={handleRoll}>{ buttonText }</button>);
};

const { func, string } = PropTypes;

Button.propTypes = {
  buttonText: string,
  btnClassList: string,
  roll: func
};

export default Button;
