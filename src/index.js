import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Chats from './Components/Auth/Chats';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';


ReactDOM.render(
  <Router>
    <App/>
    <Route exact path="/" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/chats" component={Chats} />
  </Router>,
  document.getElementById('root')
);
