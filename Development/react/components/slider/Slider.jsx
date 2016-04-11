import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'underscore';

import SliderPage from './children/SliderPage.jsx';

class Slider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 0
		}

		this.perpage = (this.props.perpage) ? Number(this.props.perpage) : 3;

		this.createPageItems = this.createPageItems.bind(this);
		this.changePage = this.changePage.bind(this);
	}

	createPageItems(){
		return _.filter(this.props.slides, function(item,key){
			return this.state.page == Math.floor(key/this.perpage);
		}.bind(this));
	}

	changePage(num){
		var m = Math.ceil(this.props.slides.length/this.perpage)-1;
		var p = this.state.page + num;
		if (p<0) p = m;
		if (p>m) p = 0;

		this.setState({
			page: p
		});
	}

	render(){
		if (!this.props.slides) {
			return <div className="loader">Loading</div>
		}

		return (
			<div className="slider">
				<SliderPage items={this.createPageItems()} itemclass={this.props.itemclass} page={this.state.page} />

				<a className="next arrow glyphicon glyphicon-chevron-right" onClick={()=>this.changePage(1)}></a>
				<a className="previous arrow glyphicon glyphicon-chevron-left" onClick={()=>this.changePage(-1)}></a>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		slides: (state.data) ? state.data['slides'] : null
	};
}

export default connect(mapStateToProps)(Slider);