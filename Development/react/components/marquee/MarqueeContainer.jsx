import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MarqueeItem from './children/MarqueeItem.jsx';

class MarqueeContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			item: 0
		}

		this.changeItem = this.changeItem.bind(this);
		setInterval(this.changeItem, 5000);
	}

	renderItems(){
		return this.props.marquees.map( (marquee, key) => {
			if (this.state.item==key) {
				return <MarqueeItem key={"marquee",key} data={marquee} />
			}
		});
	}

	changeItem(){
		this.setState({
			item: (this.state.item<this.props.marquees.length-1) ? this.state.item+1 : 0
		});
	}

	render() {
		if (!this.props.marquees) {
			return <div className="loader">Loading</div>
		}

		return (
			<div className="marquee col-sm-12">
				<div className="row">
					<ReactCSSTransitionGroup transitionName="slidein" transitionEnterTimeout={500} transitionLeaveTimeout={500} >
						{this.renderItems()}
					</ReactCSSTransitionGroup>
				</div>
			</div>
		);
	}
};


function mapStateToProps(state) {
	return {
		marquees: (state.data) ? state.data['marquees'] : null
	};
}

export default connect(mapStateToProps)(MarqueeContainer);