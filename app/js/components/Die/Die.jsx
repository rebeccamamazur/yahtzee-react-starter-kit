import React from "react";

const { func, object, number } = React.PropTypes;

export default React.createClass({

	propTypes: {
		value: object,
		onDieClick: func,
		id: number
	},

	handleDieClick() {
		this.props.onDieClick(this.props.id);
	},

	render(){
		const { value } = this.props;

		return (
			<div className={ value.held ? "die die--held" : "die" } onClick={ this.handleDieClick }>
				{ value.dieValue != 1
					?  <div><div className="die__dot die__dot--top-left" /><div className="die__dot die__dot--bottom-right" /></div>
					: "" }
				{ value.dieValue === 4 || value.dieValue === 5 || value.dieValue === 6
					?  <div><div className="die__dot die__dot--top-right" /><div className="die__dot die__dot--bottom-left" /></div>
					: "" }
				{ value.dieValue === 6
					?  <div><div className="die__dot die__dot--center-left" /><div className="die__dot die__dot--center-right" /></div>
					: "" }
				{ value.dieValue === 1 || value.dieValue === 3 || value.dieValue === 5
					?  <div className="die__dot die__dot" />
					: "" }
			</div>
		);
	}
});
