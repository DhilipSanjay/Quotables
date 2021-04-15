import React from 'react';

const ApiResponse = (props) => {
    // Green Message
    if(props.response.hasOwnProperty("message")){
        return(
            <div className="success-msg">
                <p>{props.response.message}</p>
            </div>
        );
    }

    // Red Error
    if(props.response.hasOwnProperty("error")){
        return(
            <div className="error-msg">
                <p>{props.response.error}</p>
            </div>
        );
    }

    return null;
}

export default ApiResponse;