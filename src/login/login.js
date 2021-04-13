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
            <h2>Login</h2>
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" onChange={this.onChange}/>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
            <input type="submit" value="Login" onClick={this.login}/>
            <ApiResponse response={this.state.response}/>
        </div>
        );
    }
}

export default Login;