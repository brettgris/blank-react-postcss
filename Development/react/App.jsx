import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';

import reducers from './reducers/reducers.jsx';

global.jQuery = require('jquery');
var bootstrap = require('bootstrap');

import Routes from './Routes.jsx';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  	<Provider store={createStoreWithMiddleware(reducers)}>
    	<Routes />
  	</Provider>
, document.getElementById('app'));