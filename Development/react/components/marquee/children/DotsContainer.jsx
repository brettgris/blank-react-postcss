import React, {Component} from 'react';

class DotsContainer extends Component {
	constructor(props){
		super(props);
		
		this.createDots = this.createDots.bind(this);	
	}

	createDots(){
		return this.props.items.map(function(item,key){
			var current = (key==this.props.current) ? " current" : "";
			return(
				<a className={"dot"+current} key={"dot"+key} onClick={ () => this.props.changeItem(key) }>&nbsp;</a>
			)
		}.bind(this));
	}

	render() {
		return (
			<div className="dots">
				{this.createDots()}
			</div>
		)
	}
};

export default DotsContainer;