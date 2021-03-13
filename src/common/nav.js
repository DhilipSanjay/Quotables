import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';
import Auth from '../services/auth';

function Nav(){
    if(Auth.isAuthenticated()){
       return(
            <nav>
                <h2>Quotables</h2>
                <ul className="nav-links">
                    <li onClick={() => Auth.logout()}>Logout</li>
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

export default Nav;