import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../services/auth';

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
    const ujsonData = Auth.getLocalData();
    
    if(this._isMounted === true)
    {
      this.setState({ isLoading : false, userData : ujsonData });
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
          {/* <h2>{this.state.userData.username}</h2>
          <h3>{this.state.userData.bio}</h3>
          <div>
            Quotes {this.state.userData.quotesCount}
          </div>
          <div>
            Tags {this.state.userData.tagsCount}
          </div> */}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Profile />,
    document.getElementById('root')
  );

  export default Profile;