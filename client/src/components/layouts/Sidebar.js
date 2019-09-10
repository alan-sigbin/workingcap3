import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { slide as Menu } from "react-burger-menu";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";


const Sidebar = ({auth, logout}) => {

  const authLinks = (
    <Fragment>
			<li className='nav-item'>
				<a href="/" className='bm-item menu-item f12 lobster-font'>{auth.guestname}</a>
			</li>
			<li className='nav-item'>
				<a href="#!" className='bm-item menu-item f12' onClick={ (e) => logout()}>Logout</a>
			</li>
    </Fragment>		
	)

	const guestLinks = (
    <Fragment>
			<li className='nav-item'>
				<a className='bm-item menu-item f12' href='/register'>Register</a>
			</li>
			<li className='nav-item'>
				<a href="/login" className='bm-item menu-item f12'>Login</a>
			</li>
    </Fragment>
	)



  return (
    <Menu>
      <a className='navbar-brand lobster-font' href="/vatalia">Vatalia Bikes</a>
      <div className="collapse navbar-collapse" id="navbarNav">
				{!auth.loading && (
					<Fragment>
          <ul className='navbar-nav ml-auto'>
            {auth.isAuthenticated ? authLinks : guestLinks}
          </ul>
          </Fragment>
				)}
			</div>
   
      <a className="menu-item f12" href="/">
        About
      </a>
      <a className="menu-item f12" href="/services">
        Services
      </a>
     
      {auth.isAdmin === true ? <a className="menu-item f12" href="/manage_appts">
          Manage Appointments
        </a> : 
        <a className="menu-item f12" href={`/viewmyappt/${auth._id}`}>
         View Appointments
        </a>
      }

      {/* <a className="menu-item" href="/desserts">
        Events
      </a> */}
    </Menu>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Sidebar);