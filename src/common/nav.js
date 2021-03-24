import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';
import Auth from '../services/auth';

class Nav extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        if(Auth.isAuthenticated()){
            return(
                <nav>
                <h2>Quotables</h2>
                <ul className="nav-links">
                    <li onClick={() => {
                        Auth.logout();
                        this.props.history.push("/login");
                    }}>Logout</li>
                </ul>
            </nav>
       )
    }
    else{
        return(
            <nav>
                <h2>Quotables</h2>
                <ul className="nav-links">
                    <Link to="/login">
                    <li>Login</li>
                    </Link>
                    <Link to="/signup">
                    <li>Sign Up</li>
                    </Link>
                </ul>
            </nav>
        );
    }
    }
    
}

export default Nav;