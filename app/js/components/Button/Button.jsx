import React from "react";

const { string } = React.PropTypes;

export default React.createClass({

	propTypes: {
		text: string
	},

	render(){
		const { text, onRollClick } = this.props;

		return (
			<button className="button" onClick={onRollClick}>{ text }</button>
		);
	}
});
