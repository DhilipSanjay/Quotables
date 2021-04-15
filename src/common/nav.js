import React from 'react';
import './../App.css'
import {Link} from 'react-router-dom';
import Auth from '../services/auth';

const Nav = ({toggle}) => {
        return(
            <nav className="flex justify-between items-center h-16 bg-background text-secondary text-2xl relative shadow-sm border-b-2 border-primary foot-mono">
            <Link className="p-4" to="/">
            <strong>Quotables</strong>
            </Link>
            
            <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
            {/* Menu bar */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
            <div className="pr-8 md:block hidden">
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
            </nav>
       );
}

export default Nav;