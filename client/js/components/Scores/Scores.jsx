import PropTypes from "prop-types";
import React from "react";
import Score from "./Score.jsx";

const Scores = (props) => {
  const { handleScoreClick, scores } = props;

  return(
    <div className="scores">
        <table className="scores__table">
          <tbody>
            <tr>
              <th></th>
              <th></th>
              <th>Score</th>
            </tr>
            {
              scores.map((score, index) =>
                {
                  return (
                    <Score key={ score.id } score={ score } handleScoreClick={ handleScoreClick } />
                  );
                }
              )
            }
          </tbody>
        </table>
    </div>
  );
};

const { array, func } = PropTypes;

Scores.propTypes = {
  handleScoreClick: func.isRequired,
  scores: array
};

export default Scores;
