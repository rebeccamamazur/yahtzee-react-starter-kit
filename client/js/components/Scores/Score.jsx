import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

export default class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { handleScoreClick, score } = this.props;

    handleScoreClick(score);
  }

  render() {
    const { score } = this.props;

    const classList = classNames("scores__row", {
      "is-entered": score.value !== "",
      "no-click": score.noclick
    });

    const clickHandler = score.value !== "" || score.noclick ? null : this.handleClick;

    return (
      <tr key={ score.id } className={ classList } onClick={ clickHandler }><td>{ score.name }</td><td> { score.desc } </td><td> { score.value } </td></tr>
    );
  }
}

const { object, func } = PropTypes;

Score.propTypes = {
  handleScoreClick: func.isRequired,
  score: object
};
