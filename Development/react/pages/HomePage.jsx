import React, {Component} from 'react';
import MarqueeContainer from '../components/marquee/MarqueeContainer.jsx';
import Slider from '../components/slider/Slider.jsx';

class HomePage extends Component {
	render(){
		return (
			<div className="page container-fluid">
				<MarqueeContainer />
				<div className="clear"></div>
				<Slider perpage="3" itemclass="col-sm-4" />
			</div>
		);
	}
};

export default HomePage;