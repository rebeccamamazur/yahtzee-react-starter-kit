import React from "react";

import { func, string } from "prop-types";

const propTypes = {
  buttonText: string,
  roll: func.isRequired
};


const Button = (props) => {
  const { buttonText, roll } = props;

  return( <button onClick={roll}>{ buttonText }</button>);
};

Button.propTypes = propTypes;

export default Button;
