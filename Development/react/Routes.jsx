import React from 'react';

import {Router,Route,browserHistory,IndexRoute} from 'react-router';

import BasePage from './pages/BasePage.jsx';
import HomePage from './pages/HomePage.jsx';

const Routes = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={BasePage} >
				<IndexRoute component={HomePage} />
			</Route>
		</Router>
	)
};

export default Routes;