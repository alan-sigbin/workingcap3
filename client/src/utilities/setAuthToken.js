/* 
	This is just a function that takes in a 
	token if the token is there else its gonna delete it
	from the headers
*/

import axios from "axios";

const setAuthToken = token => {
	if(token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
}

export default setAuthToken;