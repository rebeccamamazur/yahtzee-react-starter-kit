import React from "react";

import Button from "./Button/Button.jsx";
import Dice from "./Dice/Dice.jsx";

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
    scores: [],
    roll: -1
  };

  componentWillMount() {
    this.dieRoll();
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

  dieRoll = () => {
    const { dice, roll } = this.state;

    this.setState({
      dice: dice.map(function(die) {
        return die.held && roll < 2
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

  render() {
    let { dice } = this.state;

    return(
      <div className="playingboard">
        <Dice dice={dice} handleDieHold={ this.handleDieHold } />
        <Button buttonText="Roll" roll={ this.dieRoll } />
      </div>
    );
  }
}
