import React from 'react';
import Auth from '../services/auth';
import Nav from '../common/nav';
import ApiResponse from '../common/apiResponse';

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
            console.log("Fill both email and password text boxes");
        }        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
        // console.log(this.state);
    }

    render() {
        return (
        <div>
            <Nav />
            <div className="w-full max-w-xs container p-4">
            <p className="main-text">Login to Quotables</p>
            <form className="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input className="shadow appearance-none border-primary border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="Email" onChange={this.onChange} required/>
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                </label>
                <input className="shadow appearance-none border border-primary rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password"  onChange={this.onChange} required/>
                </div>
                <div className="flex items-center justify-center">
                <button className="bg-primary hover:bg-primaryDarker text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.login}>
                    Login
                </button>
                </div>
            </form>
            <ApiResponse response={this.state.response}/>
            </div>
        </div>
        );
    }
}

export default Login;