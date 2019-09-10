import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";

const Dashboard = ({
	auth: { isAuthenticated, user }, 
	services: { loading }
	}) => { 
		return loading && isAuthenticated === false ? <Spinner /> : 
		<Fragment>
			<p> welcome {user && user.guestname} </p>
			
		</Fragment>
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	services: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	services: state.services
});

export default connect(mapStateToProps)(Dashboard);