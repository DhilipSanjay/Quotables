import React from 'react';
import ReactDOM from 'react-dom';

class Profile extends React.Component {  
  _isMounted = false;

  constructor(){
    super();
    this.baseURL = "http://localhost/Quotables/src/api/";
    this.uid = 1;
    this.state = { isLoading : true, userData : [] };
  }
  
  async componentDidMount(){
    this._isMounted = true;
    const u = await fetch(this.baseURL + 'fetchUserProfile.php?uid=' + this.uid);
    const ujsonData = await u.json();
    
    if(this._isMounted === true)
    {
    this.setState({ isLoading : false, userData : ujsonData });
    } 
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }


    render() {
      let {isLoading, userData} = this.state;

      if (isLoading){
        return (
          <div>Loading...</div>
        );
      }
      else{
        if(userData.hasOwnProperty('Error') ){
          return(
            <h2>"Oops! Some error Occured! Try again after sometime"</h2>
          );
        }
        return (
          <div>
            <h1> Profile Page </h1>
            <h2>{userData.username}</h2>
            <h3>{userData.bio}</h3>
            <div>
              Quotes {userData.quotesCount}
            </div>
            <div>
              Tags {userData.tagsCount}
            </div>
          </div>
        );
      }
    }
  }
  
  ReactDOM.render(
    <Profile />,
    document.getElementById('root')
  );

  export default Profile;