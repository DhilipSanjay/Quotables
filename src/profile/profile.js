import React from 'react';
import ReactDOM from 'react-dom';

class Profile extends React.Component {  
    render() {
      return (
        <div>
          <h1> Profile Page </h1>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Profile />,
    document.getElementById('root')
  );

  export default Profile;