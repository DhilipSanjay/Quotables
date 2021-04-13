import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';


class DeleteQuotesModal extends React.Component{  
    constructor(props){
        super(props);
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

                await PostData('quotes/deleteQuotes.php', token, userData);
                console.log("Quote deleted successfully.. closing the modal");
                this.props.closeModal();
            }
            else{
                console.log("Fill all the text boxes");
            }
    }
}

    render(){
    return (
        <ReactModal 
            isOpen={this.props.showModal}
            contentLabel="Delete Quotes modal"
            appElement={document.getElementById('root')}
        >

        <button onClick={this.props.closeModal}>Close</button>
        <h2>Are you sure want to delete this quote?</h2>
        <div>
        <p>"{this.props.deleteQuotesData.quote}" <br/> Quote by {this.props.deleteQuotesData.author}</p>

        </div>
        <button onClick={this.deleteQuote}>Delete</button>
        <button onClick={this.props.closeModal}>Cancel</button>
        </ReactModal>
        );
    }
}

export default DeleteQuotesModal;