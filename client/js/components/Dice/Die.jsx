import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Die extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDieClick = () => {
    const { handleDieHold, id } = this.props;
    handleDieHold(id);
  }

  render() {
    const { held, value } = this.props;

    const classList = classNames("die", {
      "die--held": held
    });

    return(
      <div className={ classList } onClick={ this.handleDieClick }>
        { (value === 4 || value === 5 || value === 6 ) && <div className="die__dot die__dot--top-left"></div> }
        { (value === 2 || value === 3 || value === 4 || value === 5 || value === 6 ) && <div className="die__dot die__dot--top-right"></div> }
        { (value === 6 ) && <div className="die__dot die__dot--center-left"></div> }
        { (value === 1 || value === 3 || value === 5 ) && <div className="die__dot"></div> }
        { (value === 6 ) && <div className="die__dot die__dot--center-right"></div> }
        { (value === 2 || value === 3 || value === 4 || value === 5 || value === 6 ) && <div className="die__dot die__dot--bottom-left"></div> }
        { (value === 4 || value === 5 || value === 6 ) && <div className="die__dot die__dot--bottom-right"></div> }
      </div>
    );
  }
}

const { bool, func, number } = PropTypes;

Die.propTypes= {
  handleDieHold: func.isRequired,
  held: bool,
  id: number,
  value: number
};
