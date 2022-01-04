import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Navigation from './components/navigation';
import Home from './components/home';
import Volunteer from './components/volunteer';
import VolunteerSignup from './components/volunteersignup';

import Members from './components/members';
import PrintOut from './components/printout';
import Payment from './components/payment';
import Login from './components/login';
import ExportCSV from './components/exportcsv';
import SearchTextProvider from './components/searchtextprovider';
import MyAccount from './components/myaccount';
import InternalActivities from "./components/activities";
import ExternalActivities from "./components/externalActivities";
import VolunteerTable from './components/volunteertable';




class App extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Router>
        <SearchTextProvider>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/members" component={Members} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/volunteertable" component={VolunteerTable} />
            <Route exact path="/payment" component={Payment} />

            <Route exact path="/PrintOut" component={PrintOut} />
            <Route exact path="/export" component={ExportCSV} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/activities" component={InternalActivities} />
            <Route exact path="/volunteer" component={Volunteer} />
            <Route exact path="/volunteersignup" component={VolunteerSignup} />
            <Route
              exact
              path="/activities/external"
              component={ExternalActivities}

            />
          </Switch>




        </SearchTextProvider>
      </Router>
    );
  }
}

export default App;
