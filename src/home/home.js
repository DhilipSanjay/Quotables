import React from 'react';
import { Redirect } from 'react-router';
import Auth from '../services/auth'
import { Link } from 'react-router-dom';

class Home extends React.Component{

    render() {
        if(Auth.isAuthenticated()){
            return <Redirect to="/quotes" />;
        }
        return (
        <div>
            <div className="md:container md:mx-auto">
            <div className="bg-white h-screen flex flex-col justify-center items-center">
                <h1 className="title">
                    QUOTABLES
                </h1>
                <div className="p-4 lg:text-5xl md:text-3xl sm:text-2xl text-2xl text-center text-secondary mb-10 grid gap-4">
                    <p>Collect all your Quotes</p> 
                    <p>Anywhere</p>
                    <p>Anytime</p>
                </div>
                <Link className="main-btn">
                    Get Started
                    <svg className="w-6 h-6 ml-4 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </Link>
            </div>
        </div>
        </div>
        );
    }
}

export default Home;