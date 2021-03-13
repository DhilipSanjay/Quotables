import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component{

    render() {
        return (
        <div>Login</div>
        );
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('root')
  );

export default Login;