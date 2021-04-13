import React from 'react';
import Auth from '../services/auth';
import PostData from '../services/postData';
import Nav from '../common/nav';
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
            <Nav />
            Loading...
          </div>
        );
      }

      if(this.state.userData){
        return(
          <div>
            <Nav />
            <h2>"Oops! Some error Occured! Try again after sometime"</h2>
          </div>
        );
      }
      return (
        <div>
          <Nav />
          <h1> Profile Page </h1>
          <h2>{this.state.profileData.username}</h2>
          <h3>{this.state.profileData.bio}</h3>
          <div>
            Quotes {this.state.profileData.quotesCount}
          </div>
          <div>
            Tags {this.state.profileData.tagsCount}
          </div>
          <EditProfileModal editProfileData={this.state.profileData} showModal={this.state.showEditModal} closeModal={this.closeModal}/>
          <ChangePasswordModal editProfileData={this.state.profileData} showModal={this.state.showChangePasswordModal} closeModal={this.closeModal}/>
          <button onClick={this.openEditModal}>Edit Profile</button>
          <button onClick={this.openChangePasswordModal}>Change Password</button>
        </div>
      );
    }
  }

export default Profile;