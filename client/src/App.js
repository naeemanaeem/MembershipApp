
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/navigation';
import Home from './components/home';
import Members from './components/members';
import PrintOut from './components/printout';
import Login from './components/login';
import ExportCSV from './components/exportcsv';
import SearchTextProvider from './components/searchtextprovider';

class App extends Component {
  render() {

    return (
      <Router>
        <SearchTextProvider>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/PrintOut" component={PrintOut} />
          <Route exact path="/export" component={ExportCSV} />
          <Route exact path="/login" component={Login} />
        </Switch>
        </SearchTextProvider>
      </Router>
    );
  }
}

export default App;

