import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Spinner from "../layouts/Spinner";
import { getServiceById, updateService } from "../../actions/services";



const  Service_UD = ({
	services: {services, loading}, 
	auth,
	match,
	getServiceById,
	updateService
}) => {
	
const [formData, setFormData] = useState({
		title: "",
		code: "",
		price: "",
		laborvalue: "",
		description: ""
	});
	
useEffect( () => { getServiceById(match.params.id); 
	setFormData({
		title: loading || !services.title ? "" : services.title,
		code: loading || !services.code ? "" : services.code,
		price: loading || !services.price ? "" : services.price,
		laborvalue: loading || !services.laborvalue ? "" : services.laborvalue,
		description: loading || !services.description ? "" : services.description,	
	})
}, [getServiceById] );
	
	const {
			id,
			title,
			code,
			price,
			laborvalue,
			description
		} = formData;

const onChange = e => setFormData({
		...formData,
		[e.target.name]: e.target.value
	})
 	
	return (
		<Fragment>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6">
						<form 
							role="form"
							onSubmit= { e => 
								{ e.preventDefault(); 
								updateService(formData, services._id) }
							}>
							{/* <div className="form-group">
								<label for="exampleInputEmail1">service id</label>
								<input type="text" className="form-control" value={services._id} name='id' disabled/>
							</div> */}

							<div className="form-group">
								<label for="exampleInputEmail1">
									Service name 
								</label>
								<input type="text" 
									className="form-control"  
									placeholder={services.title}
									value={title}
									name='title'
									onChange={e => onChange(e)}
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputEmail1">
									Service code
								</label>
								<input type="text" 
									className="form-control"  
									placeholder={services.code}
									value={code}
									name='code'
									onChange={e => onChange(e)}
								/>
							</div>

							<div className="form-group">
								<label for="exampleInputEmail1">
									Labor Value
								</label>
								<input type="number" 
									className="form-control"  
									placeholder={services.laborvalue}
									value={laborvalue}
									name='laborvalue'
									onChange={e => onChange(e)}
								/>
							</div>

							<div className="form-group">
								<label for="exampleInputEmail1">
									Service price
								</label>
								<input type="text" 
									className="form-control"  
									placeholder={services.price}
									value={price}
									name='price'
									onChange={e => onChange(e)}
								/>
							</div>
							<div className="form-group">
								<label for="exampleInputEmail1">
									Description
								</label>
								<input type="text" 
									className="form-control"  
									placeholder={services.description}
									value={description}
									name='description'
									onChange={e => onChange(e)}
								/>
							</div>	
								<button type="submit" className="btn btn-info">
									Submit
								</button>
						</form>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
Service_UD.propTypes = {
	getServiceById: PropTypes.func.isRequired,
	updateService: PropTypes.func.isRequired,
	services: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	services: state.services,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getServiceById, updateService }
)(Service_UD);