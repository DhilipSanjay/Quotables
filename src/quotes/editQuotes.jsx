import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import Tags from './tags.jsx';
import PostData from '../services/postData';
import ApiResponse from '../common/apiResponse';

class EditQuotesModal extends React.Component{  
    constructor(props){
        super(props);
        this.state = {
            newquote : undefined,
            newauthor : undefined,
            response: {}
        }
        this.editQuote = this.editQuote.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async editQuote(e){
        if(Auth.isAuthenticated()){
            // Check if qid, newquote, newauthor, oldquote and oldauthor are not empty 
            if (this.props.editQuotesData.qid
                && this.props.editQuotesData.quote 
                && this.props.editQuotesData.author
                && this.state.newquote 
                && this.state.newauthor){
                const userData = Auth.getLocalData();
                const token = userData.token;
                delete userData.token;

                userData.qid = this.props.editQuotesData.qid;
                userData.oldquote = this.props.editQuotesData.quote;
                userData.oldauthor = this.props.editQuotesData.author;
                userData.newquote = this.state.newquote;
                userData.newauthor = this.state.newauthor;

                const postResponse = await PostData('quotes/editQuotes.php', token, userData);
                this.setState({ response: postResponse})
                console.log(this.state.response);
            }
            else{
                console.log("Fill all the text boxes");
            }
        }
    }

    static getDerivedStateFromProps(props, state){
        if (state.newquote === undefined && 
            state.newauthor === undefined) {
            return {
                newquote : props.editQuotesData.quote,
                newauthor : props.editQuotesData.author
            };
          }
          return null;
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        return (
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Edit Quotes modal"
                className="modal"
                appElement={document.getElementById('root')}
            >
            <div>
            <div className="main-text border-b-2 border-primary">Edit Quote</div>
            <form className="pt-4 pb-4 mb-1 mt-2">
                <label className="label-text">Quote</label>
                <textarea className="text-box" type="text" name="newquote" placeholder="Quote" maxlength="200" value={this.state.newquote} onChange={this.onChange} required/>
                <br/>
                <label className="label-text">Author</label>
                <input className="text-box" type="text" name="newauthor" placeholder="Author" value={this.state.newauthor} onChange={this.onChange} required/>
                <br/>
                <Tags tags={this.props.editQuotesData.tags} />
                <div className="mt-4 pt-4 border-t-2 border-primary flex flex-row gap-2 justify-end">
                <button className="square-btn flex flex-row gap-2 bg-green-500" type="submit"  onClick={this.editQuote}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Save Changes
                </button>
                
                <button className="square-btn flex flex-row gap-2 bg-red-500" onClick={this.props.closeModal}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Close</button>
            </div>
            </form>
            <ApiResponse response={this.state.response}/>
            </div>
            </ReactModal>
        );
    }
}

export default EditQuotesModal;