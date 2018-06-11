import React from "react";
import Die from "./Die/Die.jsx";
import Button from "./Button/Button.jsx";
import Score from "./Score/Score.jsx";

export default React.createClass({
	getInitialState() {
		return {
			dice: [this.rollDie(),this.rollDie(),this.rollDie(),this.rollDie(),this.rollDie()],
			rollCounter: 1,
			scoreRules: [{
					label: "Ones",
					key: "ones",
					score: 0,
					changed: false,
					scoreCheck: null,
					scoreFunction: this.scoreCountUp,
					scoreValue: 0,
					checkValue: 1,
					total: null,
					type: null
				},{
					label: "Twos",
					key: "twos",
					score: 0,
					changed: false,
					scoreCheck: null,
					scoreFunction: this.scoreCountUp,
					scoreValue: 0,
					checkValue: 2,
					total: null,
					type: null
				},{
					label: "Threes",
					key: "threes",
					score: 0,
					changed: false,
					scoreCheck: null,
					scoreFunction: this.scoreCountUp,
					scoreValue: 0,
					checkValue: 3,
					total: null,
					type: null
				},{
					label: "Fours",
					key: "fours",
					score: 0,
					changed: false,
					scoreCheck: null,
					scoreFunction: this.scoreCountUp,
					scoreValue: 0,
					checkValue: 4,
					total: null,
					type: null
				},{
					label: "Fives",
					key: "fives",
					score: 0,
					changed: false,
					scoreCheck: null,
					scoreFunction: this.scoreCountUp,
					scoreValue: 0,
					checkValue: 5,
					total: null,
					type: null
				},{
					label: "Sixes",
					key: "sixes",
					score: 0,
					changed: false,
					scoreCheck: null,
					scoreFunction: this.scoreCountUp,
					scoreValue: 0,
					checkValue: 6,
					total: null,
					type: null
				}]
		};
	},

	handleScore(scoreId) {
		var scoreData = this.state.scoreRules.find(x => x.key === scoreId);

		if (scoreData.changed) {
			// Score's already been scored; don't permit it again.
			return;
		}

		var scoreIndex = this.state.scoreRules.findIndex(x => x.key === scoreId);
		var diceValues = this.state.dice.map((d) => d.dieValue);

		var score = 0;
		var scorable = true;

		if (scoreData.scoreCheck !== null) {
			// Check against score check function
		}

		if (!scorable) {
			score = 0;
			// Score 0
		}
		else if (scoreData.scoreValue !== 0) {
			score = scoreData.scoreValue;
			// Score scoreValue
		}
		else {
			// Score whatever comes from score function
			score = scoreData.scoreFunction(diceValues, scoreData.checkValue);
		}

		// Set score, changed, yahtzee bonus if applicable, and trigger totals

		var tempScoreRules = this.state.scoreRules;

		scoreData.score = score;
		scoreData.changed = true;

		tempScoreRules[scoreIndex] = scoreData;

		this.setState({
			dice: [this.rollDie(),this.rollDie(),this.rollDie(),this.rollDie(),this.rollDie()],
			scoreRules: tempScoreRules,
			rollCounter: 1
		});
	},

	scoreCheckFullHouse(dieValues) {
		dieValues.sort();

		// 2nd or 4th sort value don't properly match first or last value
		if (dieValues[0] !== dieValues[1] || dieValues[3] !== dieValues[4]) {
			return false;
		}

		// Center value doesn't match either first or last value
		if (dieValues[0] !== dieValues[2] && dieValues[4] !== dieValues[2]) {

		}

		// Otherwise we have a full house
		return true;
	},

	scoreCheckStraight(dieValues, type) {
		/* Sort die array, reduce it to eliminate duplicates, and make string for easy checking */
		var dieString = dieValues.reduce(function(curr, item) {
			if (curr.indexOf(item) === -1) {
				curr.push(item);
			}
			return curr;
		}, []).sort().join("");

		if (type == "l") {
			if (dieString === "12345" || dieString === "23456") {
				return true;
			}
		}
		else {
			if (dieString.includes("1234") || dieString.includes("2345") || dieString.includes("3456")) {
				return true;
			}
		}
		return false;
	},

	scoreCountInstances(dieValues, whichValue, total) {
		var tally = dieValues.reduce(function(curr, item) {
			if (item === whichValue) {
				return curr + 1;
			}
			return curr;
		}, 0);

		return tally >= total ? true : false;
	},

	scoreCountUp(dieValues, whichValue) {
		return dieValues.reduce(function(curr, item) {
			if (item === whichValue) {
				return curr + item;
			}
			return curr;
		}, 0);
	},

	scoreGame() {

	},

	scoreSumUp(dieValues) {
		return dieValues.reduce(function(curr, item) {
			return curr + item;
		}, 0);
	},

	resetGame() {
		var tempScoreRules = this.state.scoreRules.map(function(r) {
			r.score = 0;
			r.changed = false;
			return r;
		});

		this.setState({
			dice: [this.rollDie(),this.rollDie(),this.rollDie(),this.rollDie(),this.rollDie()],
			rollCounter: 1,
			scoreRules: tempScoreRules
		});
	},

	rollDie() {
		return {
				dieValue: Math.ceil((Math.random() * 6)),
				held: false
			};
	},

	rollDice() {
		if (this.state.rollCounter < 3) {
			var tempDiceState = this.state.dice.map(function(d) {
				return {
					dieValue: d.held ? d.dieValue : Math.ceil((Math.random() * 6)),
					held: d.held
				};
			});

			this.setState({
				dice: tempDiceState,
				rollCounter: this.state.rollCounter + 1
			});
		}
	},

	setHold(whichDie) {
		var tempDiceState = this.state.dice.map(function(d, i) {
			if (i !== whichDie) {
				return d;
			}
			return {
				dieValue: d.dieValue,
				held: !d.held
			};
		});

		this.setState({
			dice: tempDiceState
		});
	},

	render() {

		return (
			<div className="app">
				<div>
					<Button text="New Game" onRollClick={this.resetGame} />
					<div className="dice">
						<Die id={0} value={ this.state.dice[0] } onDieClick={this.setHold} />
						<Die id={1} value={ this.state.dice[1] } onDieClick={this.setHold} />
						<Die id={2} value={ this.state.dice[2] } onDieClick={this.setHold} />
						<Die id={3} value={ this.state.dice[3] } onDieClick={this.setHold} />
						<Die id={4} value={ this.state.dice[4] } onDieClick={this.setHold} />
					</div>
					<Button text="Roll" onRollClick={this.rollDice} />
				</div>
				<table>
					<Score rules={this.state.scoreRules} dice={this.state.dice} scoreHandler={this.handleScore} />
				</table>
			</div>
		);
	}
});
