import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import { PostData } from '../services/postData';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(){
        if(this.state.email && this.state.password){
            PostData('login.php', this.state).then((result) => {
                let responseJSON = result;
                
                if(responseJSON.userData){
                    localStorage.setItem('userData', responseJSON);
                    console.log(responseJSON);
                    this.setState({redirect: true});
                }
                else{
                    console.log(responseJSON);
                }
            });

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
        
        if(this.state.redirect){
            return<Redirect to={'/quotes'} />;
        }

        if(localStorage.getItem('userData')){
            return(
                <Redirect to={'/quotes'} />
            );
        }

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