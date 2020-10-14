import React, { useState, useCallback } from 'react';
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
import FinishedProjects from './Projects/Pages/FinishedProjects';
import ReviewSuggestion from './Projects/Pages/ReviewSuggestion';
import Authenticate from './Users/Pages/Authenticate';
import { AuthContext } from './shared/context/AuthContext';
import './App.css';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const login = useCallback(() => {
    setIsLogged(true);
  }, []);

  const logout = useCallback(() => {
    setIsLogged(false);
  }, []);

  let routes;

  if (!isLogged) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <NewSuggestion />
        </Route>
        <Route path="/authenticate" exact>
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <NewSuggestion />
        </Route>
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
        <Route path="/projects/:pid" exact>
          <ReviewSuggestion />
        </Route>
        <Redirect to="/new" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLogged: isLogged, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
