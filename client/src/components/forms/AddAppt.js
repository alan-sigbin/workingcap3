import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAppt } from "../../actions/appointment";
import { getServiceById } from "../../actions/services";
import DatePicker from "react-datepicker";
// import moment from 'moment-timezone/builds/moment-timezone-with-data';
//CSS
import "react-datepicker/dist/react-datepicker.css";
//Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const AddAppt = ({services: {services}, addAppt, auth, match, getServiceById}) => {
    
    const [service_pickup, setservice_pickup] = useState(false);
    
    const [service_date, setservice_Date] = useState( new Date() );
        
    const dateChange = date => 
    { setservice_Date(date) };

    const [appt_data, setappt_data] = 
    useState({
        appt_date: "",
        appt_title: "",
        appt_code: "",
        appt_laborvalue: "",
        appt_client: "",
        appt_price: "",
        appt_pickup: false
    });
    
    useEffect( () => { 
        getServiceById(match.params.id);
    }, [getServiceById] );
    
    const {
        appt_date,
        appt_title,
        appt_code,
        appt_laborvalue,
        appt_client,
        appt_price,
        appt_pickup
        } = appt_data
    
    

    const submitHandler = () => {
        setappt_data ({
            appt_date: service_date,
            appt_pickup: service_pickup,
            appt_title: services.title,
            appt_code: services.code,
            appt_laborvalue: services.appt_laborvalue,
            appt_client: auth._id,
            appt_price: services.price,
        });
        addAppt({ 
            appt_date,
            appt_title,
            appt_code,
            appt_laborvalue,
            appt_client,
            appt_price,
            appt_pickup
        });
    };
    
    const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
         <strong>Pickup</strong> please provide address on profile section
        </Popover.Content>
    </Popover>
    );
	
	
	return(	
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://place-hold.it/180x100"/>
                        <Card.Body>
                            <Card.Title>{services.title}</Card.Title>
                            <Card.Text>
                            {services.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>service code: {services.code}</ListGroup.Item>
                            <ListGroup.Item>Price: Php {services.price}</ListGroup.Item>
                            <ListGroup.Item>             
                                    please select appointment date:
                            <DatePicker
                                selected={service_date}
                                name="date"
                                value={service_date}
                                onChange={date => dateChange(date)}
                                minDate={new Date()}
                                withPortal
                                showDisabledMonthNavigation
                                strictParsing
                                dateFormat="MM/dd/yyyy"
                            />
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                <Form>
                                    <div className="mb-3">
                                      <Form.Check 
                                        type= "checkbox"
                                        name= "checkbox"
                                        id= "checkbox"
                                        label= "pickup service"
                                        check=""
                                        onChange={
                                            e => setservice_pickup(!service_pickup)
                                        }
                                      />
                                    </div>
                                </Form>
                            </OverlayTrigger>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                        <div className="d-flex justify-content-around">
                            <button 
                                type="button" 
                                className="btn btn-outline-danger btn-sm"
                                onClick={e =>
                                    window.location.href = ('/services')
                                }
                                >
                                Cancel
                            </button>
                            <Button 
                                variant="btn btn-outline-info btn-sm"
                                onClick= { () => submitHandler() }
                            >
                                Confirm
                            </Button> 
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
	)
}

AddAppt.propTypes = {
	addAppt: PropTypes.func.isRequired,
    getServiceById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
    services: state.services
});

export default connect(mapStateToProps, {addAppt, getServiceById})(AddAppt);