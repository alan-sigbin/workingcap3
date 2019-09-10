import React, { Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAppt, updateApptStatus} from "../../actions/appointment";
import Table from 'react-bootstrap/Table';
import Spinner from '../layouts/Spinner';
import Moment from 'react-moment';



const ManageAppointments = ({appointment: {appointments}, auth, getAppt, updateApptStatus }) =>{

useEffect (() => {
    getAppt();
},[getAppt]);

const appt = appointments.map( indiv_appt =>
    <tbody key={indiv_appt._id}>
    <tr>
        <td className="f12 px-1">{indiv_appt._id}</td>
        <td className="f12"><Moment date={indiv_appt.appt_date}/></td>
        <td className="f12 lobster-font">{indiv_appt.appt_client.guestname}</td>
        <td className="f12">{indiv_appt.appt_title}</td>
        <td className="f12">{indiv_appt.appt_code}</td>
        <td className="f12">
            <div style={ 
                indiv_appt.appt_status === "released" ?
                {color: "red"} : {color: "green"}} >
                {indiv_appt.appt_status}
            </div>
        </td>
        <td className="f12">{indiv_appt.appt_price}</td>
        <td className="f12">{indiv_appt.appt_pickup}</td>
        <td>
            <div>
                <button 
                    type="submit" 
                    className="btn btn-outline-danger lobster-font btn-sm"
                    onClick={ (e) =>
                        updateApptStatus(indiv_appt._id)
                    }
                    >
                    Release
                </button>
            </div>
        </td>
    </tr>
</tbody>
);

return (
    <Fragment>
    { appointments === null ? (<Spinner />) : 
    (<Fragment>
            <div className="container-fluid mt-5 py-5 ">
                <div className="row">
                <h2 className="mx-5 px-5 lobster-font">Manage Appointments</h2>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>Appointment code</th>
                            <th className="f12 lobster-font">Appointment Date</th>
                            <th className="f12 lobster-font">Client</th>
                            <th className="f12 lobster-font">Service Name</th>
                            <th className="f12 lobster-font">Service Code</th>
                            <th className="f12 lobster-font">Status</th>
                            <th className="f12 lobster-font">Price</th>
                            <th className="f12 lobster-font">Pickup</th>
                            <th className="f12 lobster-font"></th>
                        </tr>
                    </thead>
                    {appt}
                </Table>
                </div>
            </div>
        </Fragment>)
    }
    </Fragment>
)

}

ManageAppointments.propTypes = {
    auth: PropTypes.object.isRequired,
    appointment: PropTypes.object.isRequired,
    getAppt: PropTypes.func.isRequired,
    updateApptStatus: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    appointment: state.appointment
});

export default connect(mapStateToProps, {getAppt, updateApptStatus})(ManageAppointments);