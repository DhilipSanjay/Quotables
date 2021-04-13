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
                contentLabel="Insert Quotes modal"
                appElement={document.getElementById('root')}
            >
            <button onClick={this.props.closeModal}>Close</button>
            
            <h1>Edit Profile</h1>
            <h2>{this.props.editProfileData.username}</h2>
            <form>
                <label>Bio</label>
                <input type="text" name="newbio" placeholder="Bio" value={this.state.newbio} onChange={this.onChange} required/>
                <br/>
                <input type="submit" value="Edit Profile" onClick={this.editProfile}/>
            </form>
            <ApiResponse response={this.state.response}/>
            </ReactModal>
        )
    }
}

export default EditProfileModal;