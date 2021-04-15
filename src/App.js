import './App.css';
import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProtectedRoute from './common/protectedRoute';
import Quote from './quotes/quotes';
import Profile from './profile/profile';
import Home from './home/home';
import Login from './login/login';
import SignUp from './signup/signup';
import NotFound from './common/404';
import Nav from './common/nav';
import DropDown from './common/dropdown';

function App() {
  const [isOpen, setIsOpen] =  useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
    <div className="App">
      <Nav toggle={toggle}/>
      <DropDown isOpen={isOpen} toggle={toggle}/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
        <ProtectedRoute path="/quotes" exact component={Quote}/>
        <ProtectedRoute path="/profile" exact component={Profile}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
