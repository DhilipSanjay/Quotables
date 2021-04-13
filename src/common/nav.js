import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';
import Auth from '../services/auth';

const Nav = () => {
        return(
            <nav>
            <h2>Quotables</h2>
            <ul className="nav-links">
                {
                    Auth.isAuthenticated() && 
                    <Link to="/profile">
                    <li>Profile</li>
                    </Link>
                }
                {
                    Auth.isAuthenticated() && 
                    <li onClick={() => {
                        Auth.logout();
                        window.location.reload();
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