import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';
import ApiResponse from '../common/apiResponse';

class ChangePasswordModal extends React.Component{  
    constructor(props){
        super(props);
        this.state = {
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
            response: {}
        }
        this.changePassword = this.changePassword.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async changePassword(){
        if(Auth.isAuthenticated()){
            // Check if passwords are not empty
            // Check newpassword equals confirmpassword
            if (this.state.oldpassword &&
                this.state.newpassword &&
                this.state.confirmpassword &&
                this.state.newpassword === this.state.confirmpassword){
                const userData = Auth.getLocalData();
                const token = userData.token;
                delete userData.token;

                userData.oldpassword = this.state.oldpassword;
                userData.newpassword = this.state.newpassword;

                const postResponse = await PostData('profile/changePassword.php', token, userData)
                this.setState({
                    oldpassword: '',
                    newpassword: '',
                    confirmpassword: ''
                })
                this.setState({ response: postResponse})
                console.log(this.state.response);
            }
            else{
                console.log("Fill all the fields / Passwords don't match");
            }
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        let passwordMatch = <br/>

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
            <ApiResponse response={this.state.response}/>
            </ReactModal>
        )
    }
}

export default ChangePasswordModal;