import React, {Component} from 'react';

class SliderPage extends Component {
	constructor(props){
		super(props);

		this.createItems = this.createItems.bind(this);
	}

	createItems(){
		return this.props.items.map( function(item,key){
			return (
				<div key={"slide"+key} className={"item "+this.props.itemclass}>
					<div className="content">
						{item.name}
					</div>
				</div>
			)
		}.bind(this));
	}

	render(){
		if (!this.props.items) return <div></div>

		return(
			<div className={"page page"+this.props.page} >
				<div className="row">
					{this.createItems()}
				</div>
			</div>
		);
	}
}

export default SliderPage;