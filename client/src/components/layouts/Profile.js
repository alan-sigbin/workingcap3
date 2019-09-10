import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Profile = ({auth}) => {
return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
                <br/>
                <h6>
                    {auth.guestname}
                </h6>
                <hr/> 
                <p>
                    {auth.email}
                </p>
            </div>
        </div>
    </div>
)   
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);