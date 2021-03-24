import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';
import Auth from '../services/auth';

function Nav(){
        return(
            <nav>
            <h2>Quotables</h2>
            <ul className="nav-links">
                {
                    Auth.isAuthenticated() && 
                    <li onClick={() => {
                        Auth.logout();
                    }}>Logout</li>
                }
                {
                    !Auth.isAuthenticated() &&
                    <Link to="/login">
                    <li>Login</li>
                    </Link>
                }
                {
                    !Auth.isAuthenticated() && 
                    <Link to="/signup">
                    <li>Sign Up</li>
                    </Link>
                }
            </ul>
            </nav>
       );
}

export default Nav;