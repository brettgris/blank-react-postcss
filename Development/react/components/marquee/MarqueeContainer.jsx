import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import MarqueeItem from './children/MarqueeItem.jsx';
import DotsContainer from './children/DotsContainer.jsx';

class MarqueeContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			item: 0
		}

		this.renderItems = this.renderItems.bind(this);
		this.nextItem = this.nextItem.bind(this);
		this.changeItem = this.changeItem.bind(this);
		this.resetTimeout = this.resetTimeout.bind(this);

		this.resetTimeout();
	}

	renderItems(){
		return this.props.marquees.map( (marquee, key) => {
			if (this.state.item==key) {
				return <MarqueeItem key={"marquee",key} data={marquee} />
			}
		});
	}

	nextItem(){
		var n = (this.state.item<this.props.marquees.length-1) ? this.state.item+1 : 0;
		this.changeItem(n);
	}

	changeItem(n){
		this.resetTimeout();

		this.setState({
			item: n
		});
	}

	resetTimeout(){
		if (this.to) clearTimeout(this.to);
		this.to = setTimeout(this.nextItem, 5000);
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
				<DotsContainer items={this.props.marquees} current={this.state.item} changeItem={this.changeItem} />
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