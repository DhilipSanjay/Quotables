import React from 'react';
import ReactDOM from 'react-dom';

class SignUp extends React.Component{
    render() {
        return (
        <div>
            <h1>Sign Up</h1>
        </div>
        );
    }


}

ReactDOM.render(
    <SignUp />,
    document.getElementById('root')
  );

export default SignUp;