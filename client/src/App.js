import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigation from "./components/navigation";
import Home from "./components/home";
import Volunteer from "./components/volunteer";
import VolunteerSignup from "./components/volunteersignup";
import VolunteerEdit from "./components/volunteeredit";

import Members from "./components/members";
import PrintOut from "./components/printout";
import Payment from "./components/payment";
import Login from "./components/login";
import ExportCSV from "./components/exportcsv";
import SearchTextProvider from "./components/searchtextprovider";
import MyAccount from "./components/myaccount";
import InternalActivities from "./components/activities";
import ExternalActivities from "./components/externalActivities";
import VolunteerTable from "./components/volunteertable";

const App = () => {
  const [loginStr, setLoginStr] = useState(
    localStorage.user_email ? "Logout" : "Login"
  );
  useEffect(() => {
    setLoginStr(localStorage.user_email ? "Logout" : "Login");
  }, [loginStr]);

  const handleLoginStr = () => {
    let str = localStorage.user_email ? "Logout" : "Login";
    setLoginStr(str);
  };
  return (
    <Router>
      <SearchTextProvider>
        <Navigation loginStr={loginStr} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/myaccount" component={MyAccount} />
          <Route exact path="/volunteertable" component={VolunteerTable} />
          <Route exact path="/volunteeredit" component={VolunteerEdit} />

          <Route exact path="/payment" component={Payment} />

          <Route exact path="/PrintOut" component={PrintOut} />
          <Route exact path="/export" component={ExportCSV} />
          <Route
            exact
            path="/login"
            component={() => <Login handleLoginStr={handleLoginStr} />}
          />
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
};

export default App;
