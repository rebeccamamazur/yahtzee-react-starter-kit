import React from "react";

const { array, func } = React.PropTypes;

export default React.createClass({

	propTypes: {
		rules: array,
		dice: array,
		scoreHandler: func
	},

	render(){
		const { rules, dice, scoreHandler } = this.props;

		return (
			<tbody>
				{rules.map(function(r) {
					return (<tr key={r.key} className="score" onClick={() => scoreHandler(r.key)}>
								<td className="score__label">{r.label}</td>
								<td className="score__score">{r.changed ? r.score : "" }</td>
							</tr>);
				})}
			</tbody>
		);
	}
});
