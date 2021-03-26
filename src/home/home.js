import React from 'react';
import { Redirect } from 'react-router';
import Auth from '../services/auth'
import Nav from '../common/nav';

class Home extends React.Component{

    render() {
        if(Auth.isAuthenticated()){
            return <Redirect to="/quotes" />;
        }
        return (
        <div>
            <Nav />
            <h1>Home Page</h1>
        </div>
        );
    }
}

export default Home;