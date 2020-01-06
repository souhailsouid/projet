/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/login/login';
import Game from './pages/othello/game';
import Home from './pages/accueil/home';
// import Othello from './pages/othello/othello';
import Dashboard from './pages/dashboard/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/home" component={Home} />
          {/* <Route path="/:id" component={Othello}/> */}
          <Route path="/:id" component={Game} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
