import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../services/auth';

class Login extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            email: '',
            password: '',
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async login(){
        if(this.state.email && this.state.password){
            await Auth.login(this.state)
            if(Auth.isAuthenticated() && this.props.history !== undefined){
                this.props.history.push("/quotes");
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
            <h2>Login</h2>
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" onChange={this.onChange}/>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
            <input type="submit" value="Login" onClick={this.login}/>
            
        </div>
        );
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('root')
  );

export default Login;