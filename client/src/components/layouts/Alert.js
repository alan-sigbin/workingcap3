import React from "react";
import PropTypes from "prop-types";

/*anytime you want to interact a component with redux
	or getting the state you need to use connect
*/
import {connect} from "react-redux"

const Alert = ({alerts}) => 
	alerts !== null && 
	alerts.length > 0 && 
	alerts.map(alert => (
		<div 
			key={alert.id} 
			className={`alert alert-${alert.alertType}`}
		>
			{alert.msg}
		</div>
	));


Alert.propTypes = {
	alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	alerts: state.alert //this is from the root reducer index.js file called alert
})

export default connect(mapStateToProps)(Alert);