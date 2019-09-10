import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addService } from "../../actions/services";

const AddService = ({addService, history}) => {
	const [formData, setFormData] = useState({
		title: "",
		code: "",
		price: "",
		laborvalue: "",
		description: ""
	});

	const {
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

	// const [toDateDisabled, toggleDisabled] = useState(false)
	return(
		<Fragment>
			<h1>Add Service</h1>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6">
						<form onSubmit={e => { e.preventDefault(); 
								addService(formData, history)
								}
							}
						>
							<div className="form-group">
								<label for="exampleInputEmail1">
									Service name
								</label>
								<input type="text" 
									className="form-control"  
									placeholder='Service Name'
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
									placeholder='xxxx'
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
									placeholder='1'
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
									placeholder='100.00'
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
									placeholder='kahit ano langs'
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
					<div className="col-md-6">
					</div>
				</div>
			</div>
		</Fragment>
	)
}

AddService.propTypes = {
	addService: PropTypes.func.isRequired
}

export default connect(null, {addService})(AddService);