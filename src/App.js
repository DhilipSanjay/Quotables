import logo from './logo.svg';
import './App.css';
import Quote from './quotes/quotes';
import Profile from './profile/profile';
import Nav from './nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
      <Switch>
      <Route path="/" exact component={Quote}/>
      <Route path="/quotes" component={Quote}/>
      <Route path="/profile" component={Profile}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
