import React from 'react';
import Auth from '../services/auth';
import PostData from '../services/postData';
import Nav from '../common/nav';

class Profile extends React.Component {  
  _isMounted = false;

  constructor(){
    super();
    this.baseURL = "http://localhost/Quotables/src/api/";
    this.uid = 1;
    this.state = { isLoading : true, profileData : [] };
  }
  
  async componentDidMount(){
    this._isMounted = true;
    if(Auth.isAuthenticated()){
      const userData = Auth.getLocalData();
      const token = userData.token;
      delete userData.token;
      const pjsonData = await PostData('fetchUserProfile.php', token, userData);
      
      if(this._isMounted === true)
      {
        this.setState({ isLoading : false, profileData : pjsonData });
      }
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
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
        </div>
      );
    }
  }

export default Profile;