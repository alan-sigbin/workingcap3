import axios from "axios";
import { setAlert } from "./alert";
import { 
	GET_SERVICE, 
	SERVICES_ERROR, 
	UPDATE_SERVICES,
	SERVICE_BOOKED,
	ALL_SERVICES,
	SERVICE_ADDED
} from "./types";


//Add service
export const addService = (
	formData, 
	edit = false
	) => async dispatch => {
	// alert('hey')
	try {
		const config = {
			headers: {
				"Content-Type": 'application/json'
			}
		};
		const res = await axios.post('/api/service', formData, config);
		dispatch({
			type: SERVICE_ADDED,
			payload: res.data
		})
		await setAlert('Service Added', "success")
		window.location.href = ('/services');
	} catch(err) {
		const errors = err.response.data.errors;
		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}
		
		dispatch({
			type: SERVICES_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
	}
}

//Get all service
export const getServices = () => async dispatch => {
	try {
		const res = await axios.get('/api/service');
		dispatch({
			type: ALL_SERVICES,
			payload: res.data
		})
	} catch(err) {
		dispatch({
			type: SERVICES_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
	}

}

//Get service by ID
export const getServiceById = id => async dispatch => {
	try {
		const res = await axios.get(`/api/service/${id}`);
		dispatch({
			type: GET_SERVICE,
			payload: res.data
		})
	} catch(err) {
		dispatch({
			type: SERVICES_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
	}
}

//Update Service
export const updateService = (formData, id) =>async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": 'application/json'
			}
		};
		const res = await axios.put(`/api/service/update/${id}`, formData, config);
		dispatch({
			type: UPDATE_SERVICES,
			payload: res.data
		})
		dispatch(setAlert("Service Updated", "success"));
		window.location.href=('/services');
	} catch(err) {
 		const errors = err.response.data.errors;
		errors.forEach(error => dispatch(setAlert(error.msg, "danger") ));
		dispatch({
			type: SERVICES_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
	}
}

///////////////////Delete service///////////////////
export const deleteService = id => async dispatch => {
	if(window.confirm("Are you sure?")) {
		try {
			await axios.delete(`/api/service/${id}`);
			setAlert('Service Deleted', "success")

			window.location.reload();
		} catch(err) {
			dispatch({
				type: SERVICES_ERROR,
				payload: {
					msg: err.response.statusText,
					status: err.response.status
				}
			})
		}
	}
}


//open Service modal
export const bookService = (serv, history) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": 'application/json'
			}
		};
		const res = await axios.post('/api/bookAppt', serv, config);
		
		dispatch({
			type: SERVICE_BOOKED,
			payload: res.data
		})
		dispatch(
			setAlert("Service Added", "success")
		);
		
		history.redirect('/services');
	} catch (err) {
		const errors = err.response.data.errors;

		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: SERVICES_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
	}
}