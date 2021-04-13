import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import Tags from './tags.jsx';
import PostData from '../services/postData';

class EditQuotesModal extends React.Component{  
    constructor(props){
        super(props);
        this.state = {
            newquote : undefined,
            newauthor : undefined
        }
        this.editQuote = this.editQuote.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async editQuote(){
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
    
                    await PostData('quotes/editQuotes.php', token, userData);
                    console.log("Quote edited successfully.. closing the modal");
                    this.props.closeModal();
            }
            else{
                console.log("Fill all the text boxes");
            }
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.editQuotesData.quote === undefined && 
            props.editQuotesData.author === undefined) {
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
                contentLabel="Insert Quotes modal"
                appElement={document.getElementById('root')}
            >
            <button onClick={this.props.closeModal}>Close</button>
            
            <h1>Insert Quotes</h1>
            <label>Quote</label>
            <input type="text" name="newquote" placeholder="Quote" value={this.state.newquote} onChange={this.onChange}/>
            <br/>
            <label>Author</label>
            <input type="text" name="newauthor" placeholder="Author" value={this.state.newauthor} onChange={this.onChange}/>
            <br/>
            <Tags tags={this.props.editQuotesData.tags} />
            <p>Cannot Edit Tags</p>
            <input type="submit" value="Edit Quote" onClick={this.editQuote}/>
            </ReactModal>
        );
    }
}

export default EditQuotesModal;