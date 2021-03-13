import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Quote from './quotes/quotes';
import Profile from './profile/profile';
import Nav from './common/nav';
import Home from './home/home';
import Login from './login/login';
import SignUp from './signup/signup';
import NotFound from './common/404';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/signup" exact component={SignUp}/>
      <Route path="/quotes" exact component={Quote}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="*" component={NotFound} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
