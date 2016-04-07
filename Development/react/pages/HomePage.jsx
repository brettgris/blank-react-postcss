import React, {Component} from 'react';
import MarqueeContainer from '../components/marquee/MarqueeContainer.jsx';

class HomePage extends Component {
	render(){
		return (
			<div className="page container-fluid">
				<MarqueeContainer />
			</div>
		);
	}
};

export default HomePage;