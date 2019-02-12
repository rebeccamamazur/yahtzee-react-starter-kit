import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Score from "./Score.jsx";

export default class Scores extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleScoreClick, scores } = this.props;

    return(
      <div className="scores">
        <table className="scores__table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            { scores.map((score, i) => <Score key={i} handleScoreClick={handleScoreClick} {...score} />) }
          </tbody>
        </table>
      </div>
    );
  }
}


const { array, func } = PropTypes;

Scores.propTypes= {
  scores: array.isRequired,
  handleScoreClick: func.isRequired
};
