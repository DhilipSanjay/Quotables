import React from 'react';
import ReactModal from 'react-modal';
import Auth from '../services/auth';
import PostData from '../services/postData';
import ApiResponse from '../common/apiResponse';

class InsertQuotesModal extends React.Component{  
    constructor(props){
        super(props);
        this.state={
            quote: '',
            author: '',
            tagInput: '', 
            tags: [],
            response: {}
        }
        this.onChange = this.onChange.bind(this);
        this.saveQuote = this.saveQuote.bind(this);
        this.addTagInput = this.addTagInput.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    addTagInput(e){
        e.preventDefault();
        // Update the tags
        const updatedTags = this.state.tags;
        if(this.state.tagInput){
            updatedTags.push(this.state.tagInput);

            // Set state
            this.setState({ tags : updatedTags, tagInput : ''});
            document.querySelector('.tagInput').value = "";
        }   
    }

    async saveQuote(e){
        e.preventDefault();
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

                const postResponse = await PostData('quotes/insertQuotes.php', token, userData);
                this.setState({ response: postResponse})
                console.log(this.state.response);
                setTimeout(() => this.props.closeModal(), 3000);
            }
            else{
                this.setState({ response: {"error": "Fill out all the fields!"}})
            }
        }
    }

    render(){
        return (
            <ReactModal 
                isOpen={this.props.showModal}
                contentLabel="Insert Quotes modal"
                className="modal"
                appElement={document.getElementById('root')}
            >
            {
                this.state.response.hasOwnProperty("message")
                ? <ApiResponse response={this.state.response}/>
                :
                <div>
                    <div className="main-text border-b-2 border-primary">Add a Quote</div>
                    <form className="pt-4 pb-4 mb-1 mt-2">
                        <label className="label-text">Quote</label>
                        <textarea className="text-box" type="text" name="quote" placeholder="Quote" onChange={this.onChange} maxLength="200" required/>
                        <br/>
                        <label className="label-text">Author</label>
                        <input className="text-box" type="text" name="author" placeholder="Author" onChange={this.onChange} required/>
                        <br/>
                        <ul className="tag-list flex flex-wrap space-between">
                        {
                            this.state.tags.map((tag, index) =>
                            <li className="tag-box" key={index}>
                            {tag}
                            </li>
                            )
                        }
                        </ul>
                        <label className="label-text">Tag</label>
                        
                        <div className="grid grid-cols-3 gap-2">
                            <input className="tagInput text-box m-0 col-span-2" type="text" name="tagInput" placeholder="Tag" onChange={this.onChange}/>
                            <button className="square-btn flex flex-row gap-2" onClick={this.addTagInput}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Add
                            </button>
                        </div>
                        <div className="mt-8 pt-4 border-t-2 border-primary flex flex-row gap-2 justify-end">
                            <button className="green-btn" type="submit"  onClick={this.saveQuote}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Save
                            </button>
                            
                            <button className="red-btn" onClick={this.props.closeModal}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Close</button>
                        </div>
                    </form>
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

export default InsertQuotesModal;