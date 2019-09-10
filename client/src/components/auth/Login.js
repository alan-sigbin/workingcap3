import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link, Redirect} from "react-router-dom";
import { login } from "../../actions/auth";

const Login = ({login, isAuthenticated}) => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	})

	const {email, password} = formData;

	const onChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async e => {
		e.preventDefault();
		login(email, password)
	}

	if(isAuthenticated) {
		return <Redirect to='/vatalia' />;
	}

	return (
		<div className="container-fluid bg-auth img-fluid">
			<div className="row justify-content-end mt-5 pt-5">
				<div className="col-md-3 mr-5 pr-5 py-5">
					<h6 style={{color:"white"}}>Log in</h6>
					<form className='form' onSubmit={e => onSubmit(e)}>
						<div className='form-group'>
							<input className="form-control"
								type='email'
								placeholder='Email Address'
								name='email'
								value={email}
								onChange={e => onChange(e)}
							/>
						</div>
						<div className='form-group'>
							<input className="form-control"
								type='password'
								placeholder='Password'
								name='password'
								value={password}
								onChange={e => onChange(e)}
							/>
						</div>
						<button type='submit' className='btn btn-primary'>
							Login
						</button>
					</form>
					<p className='my-1' style={{color:"white"}}>
						No account? <Link to='/register'>Register</Link>
					</p>
				</div>
			</div>
		</div>
 	)
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);