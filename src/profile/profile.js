import React from 'react';
import Auth from '../services/auth';
import PostData from '../services/postData';
import EditProfileModal from './editProfile';
import ChangePasswordModal from './changePassword'

class Profile extends React.Component {  
  _isMounted = false;

  constructor(){
    super();
    this.state = {  showEditModal: false, 
                    showChangePasswordModal: false, 
                    isLoading : true, 
                    profileData : [] };
    this.openEditModal = this.openEditModal.bind(this);
    this.openChangePasswordModal = this.openChangePasswordModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  async componentDidMount(){
    this._isMounted = true;
    if(Auth.isAuthenticated()){
      const userData = Auth.getLocalData();
      const token = userData.token;
      delete userData.token;
      const pjsonData = await PostData('Profile/fetchProfile.php', token, userData);
      
      if(this._isMounted === true)
      {
        this.setState({ isLoading : false, profileData : pjsonData });
      }
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  openEditModal () {
    this.setState({ showEditModal: true });
  }

  openChangePasswordModal(){
    this.setState({ showChangePasswordModal: true })
  }

  // Handles close for all the Modals
  closeModal () {
    this.setState({ showEditModal: false, 
                    showChangePasswordModal: false});
    window.location.reload();
  }

  render() {
      if (this.state.isLoading){
        return (
          <div>
            Loading...
          </div>
        );
      }

      if(this.state.userData){
        return(
          <div>
            <h2>"Oops! Some error Occured! Try again after sometime"</h2>
          </div>
        );
      }
      return (
        <div className="my-3 mx-auto w-full max-w-screen-lg container grid gap-y-4 justify-items-center">
         <div className="main-text mb-4">Profile</div>
          <div className="bg-secondary text-white text-6xl font-semibold rounded-full h-12 w-12 flex items-center justify-center p-16">
            DS
            </div>

          <div className="main-text">{this.state.profileData.username}</div>
          <div className="content-text justify-self-center font-semibold">{this.state.profileData.bio}</div>
          
          <div className="grid grid-cols-2 gap-4 justify-items-end">
          <div className="main-text">
            <p>{this.state.profileData.quotesCount}</p>
            <strong>Quotes</strong> 
          </div>
          <div className="main-text">
            <p>{this.state.profileData.tagsCount}</p>
            <strong>Tags</strong>
          </div>
          </div>
          <EditProfileModal editProfileData={this.state.profileData} showModal={this.state.showEditModal} closeModal={this.closeModal}/>
          <ChangePasswordModal editProfileData={this.state.profileData} showModal={this.state.showChangePasswordModal} closeModal={this.closeModal}/>
          <div className="flex flex-row gap-2 justify-center">
            <button className="square-btn flex flex-row gap-2" onClick={this.openEditModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Edit Profile
            </button>
            
            <button className="square-btn flex flex-row gap-2" onClick={this.openChangePasswordModal}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Change Password
            </button>
          </div>
        </div>
      );
    }
  }

export default Profile;