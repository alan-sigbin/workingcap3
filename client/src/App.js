import React, { Fragment, useEffect } from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import './Animate.css';
import Register from "./components/auth/Register"
import Alert from "./components/layouts/Alert";
import ViewMyAppt from "./components/dashboard/ViewMyAppt";
import AddService from "./components/forms/AddService";
import Services from "./components/dashboard/Services";
import Vatalia from "./components/dashboard/Vatalia";
import PrivateRoute from "./components/routing/PrivateRoute";
// import Home from "./components/dashboard/Home";
import Login from "./components/auth/Login";
import logo from "./images/logo.jpg";

//Redux
import {Provider} from "react-redux"
import store from "./store"
import {loadUser} from "./actions/auth"
import setAuthToken from "./utilities/setAuthToken";
import Service_UD from './components/forms/Service_UD';
import AddAppt from './components/forms/AddAppt';
import ManageAppointments from './components/dashboard/ManageAppointments';
import Sidebar from "./components/layouts/Sidebar";
// import auth from './reducers/auth';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App(auth) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <div className="container-fluid m-0 p-0">
    <Provider store={store}>
    <Sidebar />     
      <Router>
        <Fragment>
          {/* <Navbar />  */}
          <section className='container-fluid m-0 p-0' id='page-wrap'>
                    <Alert />
              <div className="row m-0 p-0">
                    <Switch>
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route exact path='/' component={Vatalia} />
                    <Route path='/vatalia' component={Vatalia} />
                    <Route path='/services' component={Services} />
                    <PrivateRoute exact path='/addService' component={AddService} />
                    <PrivateRoute exact path='/update/:id' component={Service_UD} />
                    <PrivateRoute exact path='/bookAppt/:id' component={AddAppt} />
                    <PrivateRoute exact path='/manage_appts' component={ManageAppointments} />
                    <PrivateRoute exact path='/viewmyappt/:id' component={ViewMyAppt} />        
                    </Switch>
              </div>
            
          </section>
        </Fragment>
      </Router>
    </Provider>
      <div className="container-fluid m-0 parallax p-0">
        <div className="row justify-content-end m-0 dark-overlay">
          <div className="col-md-4 my-5">
            <p className="footer-text my-5">
              17 MRT Ave Lower Bicutan Taguig<br/>
              Call 0956 978 9011
            </p>
          </div>
          <div className="col-md-2 my-5">
            <div>
              <img src={logo} alt="vatalia" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
