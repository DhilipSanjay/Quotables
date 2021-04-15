import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';
import ApiResponse from '../common/apiResponse';

class DeleteQuotesModal extends React.Component{  
    constructor(props){
        super(props);
        this.state = {response : {}};
        this.deleteQuote = this.deleteQuote.bind(this);
    }

    async deleteQuote(){
        if(Auth.isAuthenticated()){
            // Check if qid, quote and author are not empty 
            // No need to send tags, because it is set to on delete cascade.
            if (this.props.deleteQuotesData.qid
                && this.props.deleteQuotesData.quote 
                && this.props.deleteQuotesData.author){
                const userData = Auth.getLocalData();
                const token = userData.token;
                delete userData.token;
                
                userData.qid = this.props.deleteQuotesData.qid;
                userData.quote = this.props.deleteQuotesData.quote;
                userData.author = this.props.deleteQuotesData.author;

                const postResponse = await PostData('quotes/deleteQuotes.php', token, userData);
                this.setState({ response: postResponse})
                console.log(this.state.response);
            }
            else{
                this.setState({ response: {"error": "Some error occurred!"}})
            }
    }
}

    render(){
        
    return (
        <ReactModal 
            isOpen={this.props.showModal}
            contentLabel="Delete Quotes modal"
            className="modal"
            appElement={document.getElementById('root')}
        >

            
        {
            this.state.response.hasOwnProperty("message") 
            ? <ApiResponse response={this.state.response}/>
            :
            <div>
            <div className="pt-4 pb-4 mb-1 mt-2">
                <div className="main-text border-b-2 border-primary">
                    Are you sure want to delete this quote?
                </div>
                <div className="grid gap-y-2 p-4">
                    <div className="content-text">"{this.props.deleteQuotesData.quote}"</div>
                    <div className="author-text">- {this.props.deleteQuotesData.author}</div>
                </div>
    
            
            <div className="mt-4 pt-4 border-t-2 border-primary flex flex-row gap-2 justify-end">
                <button className="square-btn flex flex-row gap-2 bg-green-500" type="submit"  onClick={this.deleteQuote}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Delete
                </button>
                
                <button className="square-btn flex flex-row gap-2 bg-red-500" onClick={this.props.closeModal}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Cancel</button>
            </div>
            </div>
            

            {
                this.state.response.hasOwnProperty("error") ?
                <ApiResponse response={this.state.response}/>
                : null
            }
            </div>
        }
        
        </ReactModal>
        );
    }
}

export default DeleteQuotesModal;