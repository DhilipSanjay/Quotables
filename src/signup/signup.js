import React from 'react';
import Auth from '../services/auth';
import { Link } from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            username : '',
            password: '',
            bio: ''
        }
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async signup(){
        if( this.state.email 
            && this.state.password
            && this.state.username 
            && this.state.bio){
            if(await Auth.signup(this.state))
            {
                console.log("Successfully registered... redirecting to login page");
                this.props.history.push("/login");
            }
            else{
                console.log("Some error occurred. Try again");
            }
               
        }
        else{
            console.log("Fill all the text boxes");
        }  
    }

    render() {
        return (
        <div>
            <div className="w-full max-w-xs container p-4">
            <p className="main-text">Create your account</p>
            <form className="bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
                
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

            <div className="bg-background shadow-md rounded px-8 pt-4 pb-4 mb-4 mt-10 text-center text-lg font-semibold">
                <p>Already have an account? </p>
                <Link className="text-primary" to="/login">Login Here</Link>
            </div>
            </div>
        </div>  
        );
    }
}

export default SignUp;