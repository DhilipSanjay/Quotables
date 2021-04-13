import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';

class ChangePasswordModal extends React.Component{  
    constructor(props){
        super(props);
        this.state = {
            oldpassword: '',
            newpassword: '',
            confirmpassword: ''
        }
        this.changePassword = this.changePassword.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async changePassword(){
        if(Auth.isAuthenticated()){
            // Check if newbio not empty 
            if (this.state.oldpassword &&
                this.state.newpassword === this.state.confirmpassword){
                const userData = Auth.getLocalData();
                const token = userData.token;
                delete userData.token;

                userData.oldpassword = this.state.oldpassword;
                userData.newpassword = this.state.newpassword;

                const response = await PostData('profile/changePassword.php', token, userData)
                if(response.hasOwnProperty("Message")){
                    console.log(response.message);
                    this.props.closeModal();
                }
                else{
                    console.log(response);
                }
            }
            else{
                console.log("Passwords don't match");
            }
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        let passwordMatch = <br />
        if( this.state.newpassword && this.state.confirmpassword) {
            passwordMatch=  (this.state.newpassword !== this.state.confirmpassword)
                ? <p>Passwords don't match</p>
                : <p>Passwords match!</p>
        }
        return(
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Insert Quotes modal"
                appElement={document.getElementById('root')}
            >
            <button onClick={this.props.closeModal}>Close</button>
            
            <h1>Change Password</h1>
            <h2>{this.props.editProfileData.username}</h2>
            <label>Old Password</label>
            <input type="password" name="oldpassword" placeholder="Old Password" onChange={this.onChange}/>
            <br/>
            <label>New Password</label>
            <input type="password" name="newpassword" placeholder="New Password" onChange={this.onChange}/>
            <br/>
            <label>Confirm Password</label>
            <input type="password" name="confirmpassword" placeholder="Confirm Password" onChange={this.onChange}/>
            <br/>
            {passwordMatch}
            <input type="submit" value="Change Password" onClick={this.changePassword}/>
            </ReactModal>
        )
    }
}

export default ChangePasswordModal;