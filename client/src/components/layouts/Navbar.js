// import React, {Fragment} from "react";
// import { Link } from "react-router-dom"
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { logout } from "../../actions/auth";
// import Sidebar from "./Sidebar";



// const Navbar = ({auth: {guestname, isAuthenticated, loading}, 
// 				logout }) => {

// 	const authLinks = (		
// 		<ul className='navbar-nav ml-auto'>
// 			<li className='nav-item'>
// 				<a href="/" className='nav-link'>{guestname}</a>
// 			</li>
// 			<li className='nav-item'>
// 				<a href="#!" className='nav-link' onClick={logout}>Logout</a>
// 			</li>
// 		</ul>
// 	)

// 	const guestLinks = (
// 		<ul className='navbar-nav'>
// 			<li className='nav-item'>
// 				<Link className='nav-link' to='/register'>Register</Link>
// 			</li>
// 			<li className='nav-item'>
// 				<Link to="/login" className='nav-link'>Login</Link>
// 			</li>
// 		</ul>
		
// 	)
					  
// 	return(
// 		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			
// 			<a className='navbar-brand' href="#!">Vatalia</a>
// 			<button 
// 				className='navbar-toggler' 
// 				type='button' 
// 				data-toggle='collapse'
// 				data-target='#navbarNav'
// 			>
// 				<span className='navbar-toggler-icon'></span>
// 			</button>
// 			<div className="collapse navbar-collapse" id="navbarNav">
// 				{!loading && (
// 					<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
// 				)}
// 			</div>
// 		</nav>
// 	);
// }

// Navbar.propTypes = {
// 	logout: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
// 	auth: state.auth
// })

// export default connect(mapStateToProps, {logout})(Navbar);