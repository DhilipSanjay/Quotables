import React from 'react';
import Auth from '../services/auth';
import { Link } from 'react-router-dom';
import ApiResponse from '../common/apiResponse';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            username : '',
            password: '',
            bio: '',
            response: {}
        }
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async signup(e){
        e.preventDefault();
        if( this.state.email 
            && this.state.password
            && this.state.username 
            && this.state.bio){
            
            e.preventDefault();
            let userData = {};
            userData.email = this.state.email;
            userData.password = this.state.password;
            userData.username = this.state.username;
            userData.bio = this.state.bio;

            if(await Auth.signup(userData))
            {
                this.setState({response: {"message": "Registered Successfully"}});
                setTimeout(() => {this.props.history.push("/login")}, 3000);
            }
            else{
                this.setState({ response: {"error": "Some error Occurred. Try again!"}});
            }
               
        }
        else{
            this.setState({ response: {"error": "Fill out all the fields!"}});
        }
        this.setState({
            email: '',
            password: '',
            username: '',
            bio: ''
        });
    }

    render() {
        return (
        <div>
            <div className="w-full max-w-lg container p-4">
            <p className="main-text">Create your account</p>
            <form className="form">
                
                <div className="mb-4">
                <label className="label-text">
                    Email
                </label>
                <input className="text-box" name="email" type="email" placeholder="Email" onChange={this.onChange} required/>
                </div>

                <div className="mb-4">
                <label className="label-text">
                    Username
                </label>
                <input className="text-box" name="username" type="text" placeholder="Username" onChange={this.onChange} required/>
                </div>
                
                <div className="mb-4">
                <label className="label-text">
                    Password
                </label>
                <input className="text-box" name="password" type="password" placeholder="Password"  onChange={this.onChange} required/>
                </div>
                
                <div className="mb-6">
                <label className="label-text">
                    Bio
                </label>
                <textarea className="text-box" name="bio" type="text" placeholder="Bio" maxlength="200" onChange={this.onChange} required/>
                </div>
                
                <div className="flex items-center justify-center">
                <input className="square-btn" type="submit" value="Sign Up" onClick={this.signup} />
                </div>
            </form>
            <ApiResponse response={this.state.response}/>

            <div className="bg-background shadow-lg rounded px-8 pt-4 pb-4 mb-4 mt-10 text-center text-lg font-semibold">
                <p>Already have an account? </p>
                <Link className="text-primary" to="/login">Login Here</Link>
            </div>
            </div>
        </div>  
        );
    }
}

export default SignUp;