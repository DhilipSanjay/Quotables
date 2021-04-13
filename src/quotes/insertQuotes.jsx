import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';

class InsertQuotesModal extends React.Component{  
    constructor(props){
        super(props);
        this.state={
            quote: '',
            author: '',
            tagInput: '', 
            tags: []
        }
        this.onChange = this.onChange.bind(this);
        this.saveQuote = this.saveQuote.bind(this);
        this.addTagInput = this.addTagInput.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    addTagInput(){
        // Update the tags
        const updatedTags = this.state.tags;
        updatedTags.push(this.state.tagInput);

        // Set state
        this.setState({ tags : updatedTags, tagInput : ''});
        document.querySelector('.tagInput').value = "";
    }

    async saveQuote(){
        if(Auth.isAuthenticated()){
            // Check if quote and author are not empty 
            // Tags can be empty
            if (this.state.quote && this.state.author){
                const userData = Auth.getLocalData();
                const token = userData.token;
                delete userData.token;
    
                userData.quote = this.state.quote;
                userData.author = this.state.author;
                userData.tags = this.state.tags;

                await PostData('quotes/insertQuotes.php', token, userData);
                console.log("Quote added successfully.. closing the modal");
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
                contentLabel="Insert Quotes modal"
                appElement={document.getElementById('root')}
            >
            <button onClick={this.props.closeModal}>Close</button>
            
            <h1>Insert Quotes</h1>
            <label>Quote</label>
            <input type="text" name="quote" placeholder="Quote" onChange={this.onChange}/>
            <br/>
            <label>Author</label>
            <input type="text" name="author" placeholder="Author" onChange={this.onChange}/>
            <br/>
            <ul className="tag-list">
            {
                this.state.tags.map((tag, index) =>
                <li key={index}>
                  {tag}
                </li>
                )
            }
            </ul>
            <label>Tag</label>
            <input type="text" className="tagInput" name="tagInput" placeholder="Tag" onChange={this.onChange}/>
            <button onClick={this.addTagInput}>Add Tag</button>
            <br />
            <input type="submit" value="Save Quote" onClick={this.saveQuote}/>
            </ReactModal>
        );
    }
}

export default InsertQuotesModal;