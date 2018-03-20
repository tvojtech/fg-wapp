import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import SearchPage from './components/SearchPage'
import DetailPage from './components/detail/DetailPage';

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/:location" component={DetailPage} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </div>
);

export default App;
