import React from "react";
import classNames from "classnames";

import { array, func } from "prop-types";

const propTypes = {
  handleScoreClick: func.isRequired,
  scores: array
};


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

                  const classList = classNames("scores__row", {
                    "is-entered": score.value != ""
                  });

                  return (<tr key={index} className={classList} onClick={handleScoreClick}> <td>{ score.name }</td> <td> { score.desc } </td> <td> { score.value } </td> </tr>);
                }
              )
            }
          </tbody>
        </table>
    </div>
  );
};

Scores.propTypes = propTypes;

export default Scores;
