import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import MainNavigation from './shared/components/MainNavigation';
import NewSuggestion from './Projects/Pages/NewSuggestion';
import logo from './logo.svg';
import './App.css';

function App() {
  let routes;

  routes = (
    <Switch>
      <Route path="/" exact>
        <NewSuggestion />
      </Route>
      <Route path="/authenticate" exact></Route>
      <Route path="/new" exact></Route>
      <Route path="/ongoing" exact></Route>
      <Route path="/finished" exact></Route>
      <Route path="/states" exact></Route>
      <Route path="/states/:pid" exact></Route>
      <Route path="/projects/:pid" exact></Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );
}

export default App;
