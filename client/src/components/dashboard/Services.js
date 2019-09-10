import PropTypes from "prop-types";
import React, { Fragment, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from "react-redux";
import {getServices, deleteService} from "../../actions/services";
import {addAppt} from "../../actions/appointment";
import {Link} from 'react-router-dom';

const Services = ({ services: {services}, auth, getServices, addAppt, deleteService, history }) => {
    useEffect(() => {
        getServices();
    }, [getServices]);

    const service = services.map( serv =>
        <Fragment key={serv._id}>
            <div className="col-md-3">
                <div className="card bg-default dropshadow border-0">
                    <h6 className="card-header px-1 servicecardfill lobster-font">
                        {serv.title}
                    </h6>
                    <div className="card-body px-1">
                        <p className="card-text my-3">
                            Php {serv.price}
                        </p>
                        <p className="card-text my-3 f12">
                        {serv.description}
                        </p>
                    </div>
                    <div className="card-footer px-1 servicecardfill">
                    {auth.isAdmin ? 
                        (<ButtonGroup aria-label="Basic example" size="sm">
                            <Button 
                                variant="outline-success" 
                                size="sm"
                                href= {`/update/${serv._id}`}>
                            update</Button>                        
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick= { e => 
								{ e.preventDefault();
								deleteService(serv._id) 
                                }}>
                            delete</Button>
                        </ButtonGroup>) : 
                        (<Button 
                            variant="outline-info"
                            href={`/bookAppt/${serv._id}`}
                            size="sm"
                        >get service</Button>)}
                    </div>
                </div>
            </div> 
        </Fragment>
    );  

    return(
        <Fragment>
        <div className="container-fluid d-flex justify-content-md-around m-5">
            <div>
                <h3 className="lobster-font">Services:</h3>
            </div>
            <div>
                {auth.isAdmin === true && <Link to='/addService'><p className="lobster-font">+ Add Service</p></Link> }        			
            </div>
        </div>
            <div className="container-fluid mx-5 p-5">
                <div className="row">
                    {service}
                </div>
            </div>
        </Fragment>
    )
}      

Services.propTypes = {
	services: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getServices: PropTypes.func.isRequired,
    addAppt: PropTypes.func.isRequired,
    deleteService: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	services: state.services
});

export default connect(mapStateToProps, {getServices, addAppt, deleteService})(Services);