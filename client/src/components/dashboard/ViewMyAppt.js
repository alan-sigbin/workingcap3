import React, { Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAppt, updatePaidStatus} from "../../actions/appointment";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { setAlert } from "../../actions/alert";
import Moment from 'react-moment';
import Card from 'react-bootstrap/Card';


const ViewMyAppt = ({ getAppt, auth, appointment:{appointments} }) => {
        
const clientID = JSON.stringify(auth._id)

useEffect (() => { getAppt(clientID) }, //<---pass clientID
[clientID, getAppt]);

// const [paidstat, setPaidstat] = useState(false)

const [payment] = useState({
    name: "Payment for",
    price: 100
});


///STRIPE HANDLER
async function tokenHandler(token) {
    const res = await axios.post("/checkout", {token, payment});
    const {status} = res.data;
    console.log({status});
    if(status === 'success') {
        setAlert("Payment Success!!", "success");
    } else {
        setAlert("Payment failed", "danger");
    }
}

    const appointmentcard = appointments.map( appt =>
        <Fragment key={appt._id}>
        { appt.appt_client._id === auth._id && 
                    <div className="row">
                        <Card className="text-center mx-5 my-2 px-0 container-fluid" border="info">
                            <Card.Header className="text-left servicecardfill">
                            Appointment Date: <Moment date={appt.appt_date} />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="f12 text-left lobster-font f20">{appt.appt_title}</Card.Title>
                                <Card.Text>
                                Price: PHP {appt.appt_price}
                                </Card.Text>
                                
                            </Card.Body>
                            <Card.Footer className="text-muted servicecardfill">
                            <StripeCheckout 
                                stripeKey='pk_test_Ja7Agj8iC5xaojA12hagOCXa00ZLPCChsT'
                                description={appt._id}
                                token={tokenHandler}
                                amount={payment.price * appt.appt_price}
                                name={payment.name}
                                billingAddress
                                shippingAddress
                            />
                            </Card.Footer>
                        </Card>
                    </div>
        }
                </Fragment>
            );
    
return (

    <Fragment>
    <div className="container-fluid my-5 py-5">
        <div className="row">
            <div className="col-md-12">
                <h2 className="lobster-font text-right">My Appointments</h2>
                <div className="container-fluid">
                    {appointmentcard}
                </div>
                </div>
        </div>
    </div>
    </Fragment>
    )
}


ViewMyAppt.propTypes = {
    auth: PropTypes.object.isRequired,
    getAppt: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	appointment: state.appointment
});

export default connect(mapStateToProps, {getAppt})(ViewMyAppt);