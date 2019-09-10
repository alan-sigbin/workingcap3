import React, {Fragment, useState} from "react";
import { connect } from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";



const Register = ({setAlert, register, isAuthenticated}) => {	
	const [formData, setFormData] = useState({
		guestname: "",
		email: "",
		password: "",
		password2: ""
	})

	const {guestname, email, password, password2} = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault();

		if(password !== password2) {
			setAlert("Passwords do not match", "danger")
		} else {
			register({guestname, email, password})
		}
	}

	if(isAuthenticated) {
		return <Redirect to='/vatalia' />;
	}

	return(
		<Fragment>
		<div className="container-fluid bg-auth img-fluid">
			<div className="row justify-content-end mt-5 pt-5">
				<div className="col-md-6 mx-auto">
					<h6 style={{color:"white"}}>Please register to access site</h6>
					<form onSubmit={e => onSubmit(e)}>

						<div className="form-group">
							<input className='form-control' 
								type='text'
								placeholder='Name'
								name='guestname'
								onChange={e => onChange(e)}
								value={guestname}	
							/>
						</div>
						<div className="form-group">
							<input className='form-control' 
								type='email'
								placeholder='Email'
								name='email'
								onChange={e => onChange(e)}
								value={email}
							/>
						</div>

						<div className="form-group">
							<input className='form-control' 
								type='password'
								placeholder='Password'
								name='password'
								onChange={e => onChange(e)}
								value={password}
							/>

						</div>
						<div className="form-group">
							<input className='form-control' 
								type='password'
								placeholder='Confirm Password'
								name='password2'
								onChange={e => onChange(e)}
								value={password2}
							/>
						</div>

						<button type='submit' className='btn btn-primary'>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);