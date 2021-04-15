import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';
import Auth from '../services/auth';

const DropDown = ({isOpen, toggle}) => {
    return (
        <div className= { isOpen ?"grid grid-rows-2 text-center items-center bg-primary" : "hidden"} onClick={toggle}>
            {
                Auth.isAuthenticated() && 
                <Link className="small-btn" to="/profile">
                Profile
                </Link>
                } 

                {
                    Auth.isAuthenticated() && 
                    <button className="small-btn" onClick={() => {
                        Auth.logout();
                        window.location.reload();
                    }}>Logout</button>
                }
                {
                    !Auth.isAuthenticated() &&
                    <Link className="small-btn" to="/login">
                    Login
                    </Link>
                }
                {
                    !Auth.isAuthenticated() && 
                    <Link className="small-btn" to="/signup">
                    Sign Up
                    </Link>
                }
        </div>

    );
}

export default DropDown;