import { 
	CLEAR_SERVICES, 
	GET_SERVICE, 
	SERVICES_ERROR,
	SERVICE_ADDED,
	SERVICE_BOOKED, 
	UPDATE_SERVICES, 
	ALL_SERVICES 
} from "../actions/types";

const initialState = {
	services: [], //services list page
	loading: true,  
	error: {}
}

export default (state = initialState, action) => {
	const {type, payload} = action
	switch(type) {
		case GET_SERVICE:
		case SERVICE_ADDED:
		case SERVICE_BOOKED:
		case UPDATE_SERVICES:
			return {
				...state,
				services: payload,
				loading: false
			}	
		case ALL_SERVICES:
			return {
				...state,
				services: payload,
				loading: false
			}
		case SERVICES_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case CLEAR_SERVICES:
			return {
				...state,
				services: null,
				loading: false
			}
		default: 
			return state;
	}
}