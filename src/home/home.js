import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component{

    render() {
        return (
        <div>
            <h1>Home Page</h1>
        </div>
        );
    }
}
      
ReactDOM.render(
    <Home />,
    document.getElementById('root')
    );

export default Home;