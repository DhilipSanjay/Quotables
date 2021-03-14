import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../services/auth';
import PostData from '../services/postData';

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
          <div>Loading...</div>
        );
      }

      if(this.state.userData){
        return(
          <h2>"Oops! Some error Occured! Try again after sometime"</h2>
        );
      }
      return (
        <div>
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
  
  ReactDOM.render(
    <Profile />,
    document.getElementById('root')
  );

  export default Profile;