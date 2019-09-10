import axios from "axios";
import { setAlert } from "./alert";
import { 
	GET_APPT_ID, 
    APPT_ERROR,
    // CLEAR_APPT,
    ALL_APPT, 
    APPT_ADDED 
} from "./types";

//add appointment
export const addAppt = ({ 
                            appt_date,
                            appt_title,
                            appt_code,
                            appt_laborvalue,
                            appt_client,
                            appt_price,
                            appt_pickup
                        }) => async dispatch => {

    const config = {
        headers: {"Content-Type": 'application/json'}
    };

    const body = JSON.stringify({
        appt_date,
        appt_title,
        appt_code,
        appt_laborvalue,
        appt_client,
        appt_price,
        appt_pickup
    });

    try {
        
        const res = await axios.post('/api/appt', body, config);
        
        dispatch({
			type: APPT_ADDED,
			payload: res.data
        })
        dispatch(
			setAlert("Appointment Added", "success")
		);
        // window.location.href = '/viewmyappt';
        window.location.href = `/viewmyappt/${appt_client}`;
    }catch(err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch ({
            type: APPT_ERROR,
            payload: {
                msg: err.response.statusText,
				status: err.response.status
            }
        })
    }
}

/////////////////Get Appointment by ID/////////////////
export const getApptById = (id) => async dispatch => {
    

    console.log("actions passed id", id)
    
    try {
        const res = await axios.get(`/api/appt/${id}`);

        console.log("axios response", res)
        
        dispatch({
			type: GET_APPT_ID,
            payload: res.data
        }); 
        
        console.log("dispatched reducer")

    } catch (err) {
        dispatch({
			type: APPT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
    }
}

/////////////////Get ol Appt/////////////////
export const getAppt = () => async dispatch => {
    try {
        const res = await axios.get("/api/appt");
        console.log(res)
        dispatch({
			type: ALL_APPT,
			payload: res.data
		}); 
    } catch (err) {
        dispatch({
			type: APPT_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		})
    }
}

/////////////////Update Status/////////////////
export const updateApptStatus = (id) => async dispatch => {
    try{
        const res = await axios.put(`/api/appt/updstat/${id}`);
        dispatch({
			type: ALL_APPT,
			payload: res.data
        });
        getAppt();
    } catch (err) {
        dispatch({
			type: APPT_ERROR,
			payload: {
				msg: "Still pending",
				status: "Server Error"
			}
		})
    }
}

/////////////////Update Status Pay/////////////////
export const updatePaidStatus = (id) => async dispatch => {
    try{
        const res = await axios.put(`/api/appt/paidstat/${id}`);
        dispatch({
			type: ALL_APPT,
			payload: res.data
        });
        getAppt();
    } catch (err) {
        dispatch({
			type: APPT_ERROR,
			payload: {
				msg: "Still pending",
				status: "Server Error"
			}
		})
    }
}