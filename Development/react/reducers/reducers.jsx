import { combineReducers } from 'redux';
import DataReducer from './DataReducer.jsx';

const rootReducer = combineReducers({
	data: DataReducer
});

export default rootReducer;