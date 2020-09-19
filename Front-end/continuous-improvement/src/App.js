import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import MainNavigation from './shared/components/MainNavigation';
import NewSuggestion from './Projects/Pages/NewSuggestion';
import RecentSuggestion from './Projects/Pages/RecentSuggestions';
import CurrentProjects from './Projects/Pages/CurrentProjects';
import finishedProjects from './Projects/Pages/FinishedProjects';
import logo from './logo.svg';
import './App.css';
import FinishedProjects from './Projects/Pages/FinishedProjects';

function App() {
  let routes;

  routes = (
    <Switch>
      <Route path="/" exact>
        <NewSuggestion />
      </Route>
      <Route path="/authenticate" exact></Route>
      <Route path="/new" exact>
        <RecentSuggestion />
      </Route>
      <Route path="/ongoing" exact>
        <CurrentProjects />
      </Route>
      <Route path="/finished" exact>
        <FinishedProjects />
      </Route>
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
