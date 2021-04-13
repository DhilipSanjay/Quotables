import React from 'react';
import Auth from '../services/auth';
import Nav from '../common/nav';

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
        if(this.state.email 
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
            <Nav />
            <h1>Sign Up</h1>
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" onChange={this.onChange}/>
            <br/>
            <label>User name</label>
            <input type="text" name="username" placeholder="User Name" onChange={this.onChange}/>
            <br/>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
            <br/>
            <label>Bio</label>
            <input type="text" name="bio" placeholder="Short Bio" onChange={this.onChange}/>
            <br/>
            <input type="submit" value="Sign Up" onClick={this.signup}/>        
        </div>  
        );
    }
}

export default SignUp;