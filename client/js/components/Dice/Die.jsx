import React from "react";
import classNames from "classnames";

import { bool, func, number } from "prop-types";

const propTypes = {
  handleDieHold: func.isRequired,
  held: bool,
  id: number,
  value: number
};


const Die = (props) => {
  const { handleDieHold, held, id, value } = props;

  const classList = classNames("die", {
    "die--held": held
  });



  return(
    <div className={classList} onClick={ () => handleDieHold(id) }>
      { (value == 4 || value == 5 || value == 6) && <div className="die__dot die__dot--top-left" /> }
      { (value == 2 || value == 3 || value == 4 || value == 5 || value == 6) && <div className="die__dot die__dot--top-right" /> }
      { (value == 6) && <div className="die__dot die__dot--center-left" /> }
      { (value == 1 || value == 3 || value == 5) && <div className="die__dot die__dot" /> }
      { (value == 6) && <div className="die__dot die__dot--center-right" /> }
      { (value == 2 || value == 3 || value == 4 || value == 5 || value == 6) && <div className="die__dot die__dot--bottom-left" /> }
      { (value == 4 || value == 5 || value == 6) && <div className="die__dot die__dot--bottom-right" /> }
    </div> );
};

Die.propTypes = propTypes;

export default Die;
