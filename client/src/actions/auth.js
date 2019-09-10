import axios from "axios";
import {setAlert} from "./alert";
import {
	REG_SUCCESS, 
	REG_FAIL, 
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_SERVICES
} 
	from "./types";
import setAuthToken from "../utilities/setAuthToken";

//Load User
export const loadUser = () => async dispatch => {
	if(localStorage.token) {
		setAuthToken(localStorage.token);
	};
	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch(err) {
		dispatch({
			type: AUTH_ERROR
		})
	}
};

//Register
export const register = ({guestname, email, password}) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': "application/json"
		}
	};

	const body = JSON.stringify({guestname, email, password});
	console.log(body);

	try {
		const res = await axios.post("/api/guests", body, config);
		dispatch({
			type: REG_SUCCESS,
			payload: res.data
		})
		dispatch(loadUser());
		window.location.href="/vatalia";
	}catch(err) {
		const errors = err.response.data.errors;
		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: REG_FAIL
		})
	}
};

//Login user
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': "application/json"
		}
	};

	const body = JSON.stringify({email, password});

	try {
		const res = await axios.post("/api/auth", body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
		window.location.href="/vatalia";
	}catch(err) {
		const errors = err.response.data.errors;
		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: LOGIN_FAIL
		})
	}
};

export const logout = () => dispatch =>{
	dispatch({type: CLEAR_SERVICES});
	dispatch({type: LOGOUT});
	window.location.href="/login";
};