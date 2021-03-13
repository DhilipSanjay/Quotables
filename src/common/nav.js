import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <nav>
            <h2>Quotables</h2>
            <ul className="nav-links">
                <Link to="/quotes">
                <li>Quotes</li>
                </Link>
                <Link to="/profile">
                <li>Profile</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;