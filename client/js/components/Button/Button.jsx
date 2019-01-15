import React from "react";

import { func, string } from "prop-types";

const propTypes = {
  buttonText: string,
  btnClassList: string,
  roll: func.isRequired
};


const Button = (props) => {
  const { btnClassList, buttonText, roll } = props;

  return( <button className={btnClassList} onClick={roll}>{ buttonText }</button>);
};

Button.propTypes = propTypes;

export default Button;
