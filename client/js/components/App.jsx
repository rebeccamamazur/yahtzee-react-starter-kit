import React from "react";
import R from "ramda";
import classNames from "classnames";

import Button from "./Button/Button.jsx";
import Dice from "./Dice/Dice.jsx";
import Scores from "./Scores/Scores.jsx";

export default class App extends React.Component {

  static propTypes = {
  };

  /* Set initial state */
  state = {
    dice: [
      {
        id: 1,
        value: 1,
        held: false
      },
      {
        id: 2,
        value: 2,
        held: false
      },
      {
        id: 3,
        value: 3,
        held: false
      },
      {
        id: 4,
        value: 4,
        held: false
      },
      {
        id: 5,
        value: 5,
        held: false
      }
    ],
    scores: [
      {
        id: 1,
        name: "Ones",
        scoring: "sumOfNums",
        scoreParams: [1],
        desc: "Sum of 1s",
        value: ""
      },
      {
        id: 2,
        name: "Twos",
        scoring: "sumOfNums",
        scoreParams: [2],
        desc: "Sum of 2s",
        value: ""
      },
      {
        id: 3,
        name: "Threes",
        scoring: "sumOfNums",
        scoreParams: [3],
        desc: "Sum of 3s",
        value: ""
      },
      {
        id: 4,
        name: "Fours",
        scoring: "sumOfNums",
        scoreParams: [4],
        desc: "Sum of 4s",
        value: ""
      },
      {
        id: 5,
        name: "Fives",
        scoring: "sumOfNums",
        scoreParams: [5],
        desc: "Sum of 5s",
        value: ""
      },
      {
        id: 6,
        name: "Sixes",
        scoring: "sumOfNums",
        scoreParams: [6],
        desc: "Sum of 6s",
        value: ""
      },
      {
        id: 7,
        name: "Subtotal",
        scoring: "sumOfScores",
        scoreParams: [[1,2,3,4,5,6]],
        desc: "Subtotal of upper half",
        noclick: true,
        value: ""
      },
      {
        id: 8,
        name: "Bonus",
        scoring: "bonusCheck",
        scoreParams: [[1,2,3,4,5,6],63,35],
        desc: "Subtotal ≥ 63",
        noclick: true,
        value: ""
      },
      {
        id: 9,
        name: "Total, top half",
        scoring: "sumOfScores",
        scoreParams: [[1,2,3,4,5,6,8]],
        desc: "Total of upper half and bonus",
        noclick: true,
        value: ""
      },
      {
        id: 10,
        name: "3 of a Kind",
        scoring: "checkMultis",
        scoreParams: [[3,4,5],"sumOfAll", true],
        desc: "",
        value: ""
      },
      {
        id: 11,
        name: "4 of a Kind",
        scoring: "checkMultis",
        scoreParams: [[4,5],"sumOfAll", true],
        desc: "",
        value: ""
      },
      {
        id: 12,
        name: "Full House",
        scoring: "checkMultis",
        scoreParams: [[2,3],25, false],
        desc: "3 of one value and 2 of another",
        value: ""
      },
      {
        id: 13,
        name: "Small Straight",
        scoring: "checkStraight",
        scoreParams: [4, 30],
        desc: "",
        value: ""
      },
      {
        id: 14,
        name: "Large Straight",
        scoring: "checkStraight",
        scoreParams: [5, 40],
        desc: "",
        value: ""
      },
      {
        id: 15,
        name: "Yahtzee",
        scoring: "checkMultis",
        scoreParams: [[5],50, false],
        desc: "5 of a kind",
        value: ""
      },
      {
        id: 16,
        name: "Chance",
        scoring: "sumOfAll",
        scoreParams: [],
        desc: "",
        value: ""
      },
      {
        id: 17,
        name: "Subtotal",
        scoring: "sumOfScores",
        scoreParams: [[10,11,12,13,14,15,16]],
        desc: "Subtotal of lower half",
        noclick: true,
        value: ""
      },
      {
        id: 18,
        name: "Total",
        scoring: "sumOfScores",
        scoreParams: [[1,2,3,4,5,6,8,10,11,12,13,14,15,16]],
        desc: "",
        noclick: true,
        value: ""
      }
    ],
    roll: -1
  };

  componentWillMount() {
    this.dieRoll(true);
  }

  componentDidUpdate(prevProps) {
    if (this.state.roll === -1) {
      this.dieRoll(true);
    }
  }

  dieHoldReset = () => {
    const { dice } = this.state;

    this.setState({
      dice: dice.map(function(die) {
        return {
            id: die.id,
            value: die.value,
            held:false
          };
      })
    });
  }

  dieRoll = (reset) => {
    const { dice, roll } = this.state;

    this.setState({
      dice: dice.map(function(die) {
        return die.held && !reset && roll < 2
          ? die
          : {
            id: die.id,
            value: Math.ceil((Math.random() * 6)),
            held: false
          };
      }),
      roll: (roll + 1) % 3
    });
  }

  handleDieHold = (did) => {
    const { dice } = this.state;

    this.setState({
      dice: dice.map(function(die) {
        return die.id === did
          ? {
            id: die.id,
            value: die.value,
            held: !die.held
          }
          : die;
      })
    });
  }

  countUp = () => {
    const { dice } = this.state;

    return dice.reduce((accum, die) => {
      accum[(die.value - 1)]++;

      return accum;
    }, [0,0,0,0,0,0]);
  }

  bonusCheck = (newScores) => {
    return newScores.map((thisScore) => {
      return thisScore.scoring == "bonusCheck"
        ? R.merge(thisScore,
          {
            value: this.sumOfScores(thisScore, newScores) >= thisScore.scoreParams[1]
              ? thisScore.scoreParams[2]
              : 0
          })
        : thisScore;
    });
  }

  subtotalIt = (newScores) => {
    if (newScores) {
      const bonusScores = this.bonusCheck(newScores);
      return bonusScores.map((thisScore) => {
        return thisScore.scoring == "sumOfScores"
          ? R.merge(thisScore, { value: this.sumOfScores(thisScore, bonusScores)})
          : thisScore;
      });
    }

    return newScores;
  }

  sumOfScores = (score, newScores) => {
    return newScores.reduce((accum, thisScore) => {
      const intValue = parseInt(thisScore.value) ? parseInt(thisScore.value) : 0;
      return score.scoreParams[0].indexOf(thisScore.id) > -1 ? accum + intValue : accum;
    }, 0);
  }

  checkMultis = (score) => {
    const dieCount = this.countUp();

    if (score.scoreParams[2]) {
      if (score.scoreParams[0].some(val =>  dieCount.includes(val))) {
        return score.scoreParams[1] == "sumOfAll" ? this.sumOfAll(score) : score.scoreParams[1];
      }
    }
    else {
      if (score.scoreParams[0].every(val =>  dieCount.includes(val))) {
        return score.scoreParams[1] == "sumOfAll" ? this.sumOfAll(score) : score.scoreParams[1];
      }
    }

    return 0;
  }

  checkStraight = (score) => {
    const dieCount = this.countUp();

    const inARow = dieCount.reduce((accum, num) => {
      if (num > 0 && accum.prev > 0) {
        accum.inarow++;
      }
      else if (accum.inarow < score.scoreParams[0]) {
        accum.inarow = 0;
      }

      return accum;
    }, {"inarow": 0, "prev": 1});

    return inARow.inarow === score.scoreParams[0] ? score.scoreParams[1] : 0;
  }

  sumOfNums = (score) => {
    const { dice } = this.state;

    return dice.reduce((accum, die) => {
      return die.value == score.scoreParams[0] ? accum + die.value : accum;
    }, 0);
  }

  sumOfAll = (score) => {
    const { dice } = this.state;

    return dice.reduce((accum, die) => {
      return accum + die.value;
    }, 0);
  }

  handleScoreClick = (score) => {
    const { scores } = this.state;

    const scoreValue = this[score.scoring](score);

    const newScores = this.subtotalIt(scores.map((thisScore) => {
      return score.id == thisScore.id
        ? R.merge(thisScore, { value: scoreValue})
        : thisScore;
    }));

    this.setState({
      scores: newScores,
      roll: -1
    });
  }

  render() {
    let { dice, scores, roll } = this.state;

    const rollHandler = roll >= 2 ? null : this.dieRoll;


    const btnClassList = classNames("scores__row", {
      "is-disabled": roll >= 2
    });

    return(
      <div className="playingboard">
        <div className="column">
          <Dice dice={dice} handleDieHold={ this.handleDieHold } />
          <Button btnClassList={btnClassList} buttonText="Roll" roll={ rollHandler } />
          <p>Roll count: { ( roll + 1 ) }</p>
        </div>
        <div className="column">
          <Scores scores={scores} handleScoreClick={ this.handleScoreClick } />
        </div>
      </div>
    );
  }
}
