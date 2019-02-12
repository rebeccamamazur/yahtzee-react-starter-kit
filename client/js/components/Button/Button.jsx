import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  buttonClickBehavior = () => {
    const { handleClick } = this.props;

    if ( handleClick ) {
      handleClick(false);
    }
  }

  render() {
    const { buttonText, handleClick } = this.props;

    const classList = classNames("", {
      "is-disabled": !handleClick
    });

    return(<button className={ classList } onClick={ this.buttonClickBehavior }>{ buttonText }</button>);
  }
}

const { func, string } = PropTypes;

Button.propTypes= {
  buttonText: string.isRequired,
  handleClick: func
};
