import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { desc, handleScoreClick, id, name, noclick, scoring, scoreParams, value } = this.props;

    const score = {
      id: id,
      name: name,
      scoring: scoring,
      scoreParams: scoreParams,
      desc: desc,
      noclick: noclick,
      value: value
    }

    const handleClick = noclick ? null : handleScoreClick;

    const classList = classNames("scores__row", {
      "no-click": noclick,
      "is-entered": value !== ""
    });

    return(
      <tr className={ classList } onClick={ () => handleClick(score) }>
        <td>{ name }</td>
        <td>{ desc }</td>
        <td>{ value }</td>
      </tr>
    );
  }
}

const { array, bool, func, number, string } = PropTypes;

Score.propTypes= {
  handleScoreClick: func.isRequired,
  id: number,
  name: string,
  scoring: string,
  scoreParams: array,
  desc: string,
  noclick: bool,
  value: string
};
