import React, {Fragment} from "react";
import { connect } from "react-redux";
import bicycle from "../../images/bicycle.svg";
import blocks from "../../images/blocks.svg";
import customer from "../../images/customer.svg";
import mechanic from "../../images/mechanic.svg";

const Vatalia = ({auth}) => {

return(
    <Fragment>
        <div className="container-fluid">
            <div className="banner row">
                <div className="col-md-12">
                    <div>
                        <h1 className="lobster-font lightfont">
                            Vatalia Bikes Co.
                        </h1>
                        <p style={{color:"#DDDFE2"}}>
                            We are all about bikes
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 m-0 p-0">
                <div className="parallax d-flex align-items-center">
                    <p className="para-text m-5">
                        We aim to be the most preferred bicycle store and maintenance provider. With our main goals of delivering high value, high quality, good service and providing customer satisfaction.
                    </p>
                </div>
                </div>
                <div className="col-md-6 parallax mx-0 px-0">
                    <div className="row dark-overlay mx-0 px-0">

                        <div className="col-md-6 p-5">
                            <div className="card" style={{border: "0px"}}>
                            <div className="abtimagecontainer ">
                                <div className="overlay">
                                    <div className="abttext">No matter what your mechanical issue you have, we can fix it!</div>
                                </div>
                                <div className="parallax">
                                <div className="dark-overlay">
                                    <img src={bicycle} alt="bicycle" className="abtimage img-fluid"/>
                                </div>
                                </div>
                            </div>

                                <div className="card-body p-0 parallax">
                                <div className="dark-overlay">
                                    <p className="card-text text-white f20 lobster-font">
                                    Full Service Shop
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 p-5">
                            <div className="card" style={{border: "0px"}}>
                            <div className="abtimagecontainer ">
                                <div className="overlay">
                                    <div className="abttext">With a innovative and creative staff with years of in-shop experience, we can handle whatever you can throw at us.</div>
                                </div>
                                <div className="parallax">
                                <div className="dark-overlay">
                                    <img src={mechanic} alt="mechanic" className="abtimage img-fluid"/>
                                </div>
                                </div>
                            </div>
                                <div className="card-body p-0 parallax">
                                <div className="dark-overlay">
                                    <p className="card-text text-white f20 lobster-font">
                                    Talented Mechanics
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 p-5">
                            <div className="card" style={{border: "0px"}}>
                            <div className="abtimagecontainer">
                                <div className="overlay">
                                    <div className="abttext">Whether you are a professional racer or recreational enthusiast are goal is to make you smile while riding or on the podium.</div>
                                </div>
                                <div className="parallax">
                                <div className="dark-overlay">
                                    <img src={blocks} alt="blocks" className="abtimage img-fluid"/>
                                </div>
                                </div>
                            </div>
                                <div className="card-body p-0 parallax">
                                <div className="dark-overlay">
                                    <p className="card-text text-white f20 lobster-font">
                                    Best Bike Fitting
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 p-5">
                            <div className="card" style={{border: "0px"}}>
                            <div className="abtimagecontainer">
                                <div className="overlay">
                                    <div className="abttext">Our customer service specialists strive to make sure your completely satisfied with your cycling experience.</div>
                                </div>
                                <div className="parallax">
                                <div className="dark-overlay">
                                    <img src={customer} alt="customer" className="abtimage img-fluid"/>
                                </div>
                                </div>
                            </div>
                                <div className="card-body p-0 parallax">
                                <div className="dark-overlay">
                                    <p className="card-text text-white f20 lobster-font">
                                    Customer Care
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
};

const mapStateToProps = state => ({
    	auth: state.auth
    })
    
export default connect(mapStateToProps)(Vatalia);