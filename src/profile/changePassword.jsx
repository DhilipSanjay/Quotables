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

    async changePassword(e){
        e.preventDefault();
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
                setTimeout(() => this.props.closeModal(), 3000);
            }
            else{
                this.setState({ response: {"error" : "Fill all the fields / Passwords don't match"}})
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
                ? <ApiResponse response={{"error": "Passwords don't match!"}} />
                : <ApiResponse response={{"message": "Passwords match!"}} />
        }
        return(
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Change Password modal"
                className="modal"
                appElement={document.getElementById('root')}
            >            
           <div>
            <div className="main-text mb-4 border-b-2 border-primary">Change Password</div>
            <div className="main-text">{this.props.editProfileData.username}</div>
            <form className="pt-4 pb-4 mb-1 mt-2">
                <label className="label-text">Old Password</label>
                <input className="text-box" type="password" name="oldpassword" placeholder="Old Password" onChange={this.onChange} required/>
                <br/>
                <label className="label-text">New Password</label>
                <input className="text-box" type="password" name="newpassword" placeholder="New Password" onChange={this.onChange} required/>
                <br/>
                <label className="label-text">Confirm Password</label>
                <input className="text-box" type="password" name="confirmpassword" placeholder="Confirm Password" onChange={this.onChange} required/>
                <br/>
                {passwordMatch}
                
                <div className="mt-4 pt-4 border-t-2 border-primary flex flex-row gap-2 justify-end">
                    <button className="green-btn" type="submit"  onClick={this.changePassword}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Change Password
                    </button>
                
                    <button className="red-btn" onClick={this.props.closeModal}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Close</button>
                    </div>
            </form>
            <ApiResponse response={this.state.response}/>
            </div>
            </ReactModal>
        )
    }
}

export default ChangePasswordModal;