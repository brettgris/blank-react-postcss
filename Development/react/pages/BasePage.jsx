import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData} from '../actions/actions.jsx';

import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';

class BasePage extends Component {
	constructor(props){
		super(props);

		this.props.fetchData();
	}
	render(){
		return (
			<div className="wrapper">
				<Header />
				<div className="content">
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
};

function mapDispatchToProps(dispatch){
	return bindActionCreators( {fetchData}, dispatch);
}

export default connect(null, mapDispatchToProps)(BasePage);