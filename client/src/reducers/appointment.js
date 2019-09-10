import { 
    APPT_ADDED,
    APPT_ERROR,
    CLEAR_APPT,
    GET_APPT_ID,
    ALL_APPT
} from "../actions/types";

const initialState = {
	appointments: [],
	loading: true,  
	error: {}
}

export default (state = initialState, action) => {

	const {type, payload} = action
	switch(type) {
		
		case APPT_ADDED:
			return {
				...state,
				appointments: payload,
				loading: false
			}	
		case GET_APPT_ID:
		case ALL_APPT:
			return {
				...state,
				appointments: payload,
				loading: false
			}
		case APPT_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case CLEAR_APPT:
			return {
				...state,
				appointments: null,
				loading: false
			}
		default: 
			return state;
	}
}