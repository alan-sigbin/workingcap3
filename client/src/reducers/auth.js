import {
	REG_FAIL, 
	REG_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
}

export default function(state = initialState, action) {
	const {type, payload} = action
	switch(type) {
		case USER_LOADED:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}
		case REG_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token)
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}
		case REG_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem("token")
			return {
				...state,
				...payload,
				token: null,
				_id: null,
				guestname: null,
    			email: null,
				avatar: null, 				
				isAuthenticated: false,
				loading: false
			}
		default:
			return state
	}
}