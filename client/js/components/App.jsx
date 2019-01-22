import React from "react";
import R from "ramda";
import classNames from "classnames";

/* TODO: Import React components! */

export default class App extends React.Component {

  state = {
    dice: [],
    scores: [],
    roll: -1
  };

  /* ----------- React Life Cycle ----------- */
  componentDidMount() {
    /* TODO: Fetch initialization values */
  }

  componentDidUpdate(prevProps) {
    /* TODO: roll?  Yeah, probably roll. */
  }

  /* ----------- Yahtzee Behaviors ----------- */
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

  checkMultis = (score) => {
    const dieCount = this.countUp();

    /* If Yahtzee, we're good */
    if (dieCount.includes(5)) {
      return score.scoreParams[1] == "sumOfAll" ? this.sumOfAll(score) : score.scoreParams[1];
    }

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

    /* If Yahtzee, we're good */
    if (dieCount.includes(5)) {
      return score.scoreParams[1];
    }

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

  countUp = () => {
    const { dice } = this.state;

    return dice.reduce((accum, die) => {
      accum[(die.value - 1)]++;

      return accum;
    }, [0,0,0,0,0,0]);
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

  sumOfAll = (score) => {
    const { dice } = this.state;

    return dice.reduce((accum, die) => {
      return accum + die.value;
    }, 0);
  }

  sumOfNums = (score) => {
    const { dice } = this.state;

    return dice.reduce((accum, die) => {
      return die.value == score.scoreParams[0] ? accum + die.value : accum;
    }, 0);
  }

  sumOfScores = (score, newScores) => {
    return newScores.reduce((accum, thisScore) => {
      const intValue = parseInt(thisScore.value) ? parseInt(thisScore.value) : 0;
      return score.scoreParams[0].indexOf(thisScore.id) > -1 ? accum + intValue : accum;
    }, 0);
  }

  /* ----------- Click Handlers ----------- */
  /* TODO: dieRoll */

  /* TODO: handleDieHold */

  /* TODO: handleScoreClick */

  /* ----------- Render ----------- */
  render() {
    return(<div></div>);
  }
}
