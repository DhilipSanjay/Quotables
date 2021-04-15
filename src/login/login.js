import React from 'react';
import Auth from '../services/auth';
import ApiResponse from '../common/apiResponse';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Login extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            email: '',
            password: '',
            response: {}
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async login(e){
        e.preventDefault();
        if(this.state.email && this.state.password){
            const postResponse = await Auth.login(
                {
                    "email" : this.state.email,
                    "password" : this.state.password
                })
            if(Auth.isAuthenticated() && this.props.history !== undefined){
                this.props.history.push("/quotes");
            }
            else{
                this.setState({ response: postResponse})
            }
        }
        else{
            this.setState({ response: {"error": "Fill out all the fields!"}})
        }        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
        // console.log(this.state);
    }

    render() {
        if(Auth.isAuthenticated()){
            return <Redirect to="/quotes" />;
        }

        return (
        <div>
            <div className="w-full max-w-xs container p-4">
            <p className="main-text">Login to Quotables</p>
            <form className="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
                <div className="mb-4">
                <label className="label-text">
                    Email
                </label>
                <input className="text-box" name="email" type="email" placeholder="Email" onChange={this.onChange} required/>
                </div>
                <div className="mb-6">
                <label className="label-text">
                    Password
                </label>
                <input className="text-box" name="password" type="password" placeholder="Password"  onChange={this.onChange} required/>
                </div>
                <div className="flex items-center justify-center">
                <input className="square-btn" type="submit" value="Login" onClick={this.login} />
                </div>
            </form>
            <ApiResponse response={this.state.response}/>
            

            <div className="bg-background shadow-md rounded px-8 pt-4 pb-4 mb-4 mt-10 text-center text-lg font-semibold">
                <p>Don't have an account? </p>
                <Link className="text-primary" to="/signup">Sign Up</Link>
            </div>
            </div>
        </div>
        );
    }
}

export default Login;