import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';
import ApiResponse from '../common/apiResponse';

class EditProfileModal extends React.Component{  
    constructor(props){
        super(props);
        this.state = {
            newbio : undefined,
            response: {}
        }
        this.editProfile = this.editProfile.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async editProfile(){
        if(Auth.isAuthenticated()){
            // Check if newbio not empty 
            if (this.state.newbio){
                const userData = Auth.getLocalData();
                const token = userData.token;
                delete userData.token;

                userData.bio = this.props.editProfileData.bio;
                userData.newbio = this.state.newbio;

                const postResponse = await PostData('profile/editProfile.php', token, userData);
                this.setState({ response: postResponse})
                console.log(this.state.response);
            }
            else{
                console.log("Fill all the text boxes");
            }
        }
    }
    
    static getDerivedStateFromProps(props, state){
        if (state.newbio === undefined) {
            return {
                newbio : props.editProfileData.bio,
            };
      }
      return null;
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        return(
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Edit Profile modal"
                className="modal"
                appElement={document.getElementById('root')}
            >
            <div>
            <div className="main-text border-b-2 border-primary">Edit Profile</div>

            <form className="pt-4 pb-4 mb-1 mt-2">
                <label className="label-text">Username</label>
                <input className="text-box text-gray-400" type="text" value={this.props.editProfileData.username} readOnly required/>
                <br/>
                <label className="label-text">Email</label>
                <input className="text-box text-gray-400" type="email" value={this.props.editProfileData.email} readOnly required/>
                <br/>
                <label className="label-text">Bio</label>
                <textarea className="text-box" type="text" name="newbio" placeholder="Bio" value={this.state.newbio} onChange={this.onChange} required/>
                <br/>
                
                <div className="mt-4 pt-4 border-t-2 border-primary flex flex-row gap-2 justify-end">
                <button className="square-btn flex flex-row gap-2 bg-green-500" type="submit"  onClick={this.editProfile}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Edit
                </button>
                
                <button className="square-btn flex flex-row gap-2 bg-red-500" onClick={this.props.closeModal}>
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

export default EditProfileModal;