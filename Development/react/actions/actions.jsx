import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';

//GET THEM
export function fetchData(){
	const url = "/data/data.json"
	const request = axios.get(url);

	return {
		type: FETCH_DATA,
		payload: request
	}
}

