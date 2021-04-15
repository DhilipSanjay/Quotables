import React from 'react';
import Auth from '../services/auth';
import PostData from '../services/postData';
import Tags from './tags.jsx';
import AllTags from './allTags.jsx';
import InsertQuotesModal from './insertQuotes';
import DeleteQuotesModal from './deleteQuotes';
import EditQuotesModal from './editQuotes';
import ApiResponse from '../common/apiResponse';

class Quote extends React.Component { 
    _isMounted = false;

    constructor(props){
      super(props);
      this.state = {  isLoading : false, 
                      quotesdata : [], 
                      allTags : [] , 
                      showInsertModal: false,
                      showDeleteModal: false,
                      showEditModal: false,
                      deleteQuotesData: {},
                      editQuotesData: {}
                    };
      this.openInsertModal = this.openInsertModal.bind(this);
      this.openDeleteModal = this.openDeleteModal.bind(this);
      this.openEditeModal = this.openEditModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    
    async componentDidMount() {
      this._isMounted = true;
      if(Auth.isAuthenticated()){
        const userData = Auth.getLocalData();
        const token = userData.token;
        delete userData.token;
        const qjsonData = await PostData('quotes/fetchQuotes.php', token, userData);
        const tjsonData = await PostData('tags/fetchTags.php', token, userData);
        
        if(this._isMounted === true)
        {
        this.setState({ isLoading : false, quotesdata : qjsonData, allTags : tjsonData });
        } 
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    openInsertModal () {
      this.setState({ showInsertModal: true });
    }

    openDeleteModal (quotesData) {
      this.setState({ deleteQuotesData: quotesData,  showDeleteModal: true });
    }

    openEditModal (quotesData) {
      this.setState({ editQuotesData: quotesData,  showEditModal: true });
    }

    // Handles close for all the Modal
    closeModal () {
      this.setState({ editQuotesData: {}, showEditModal: false,
                      deleteQuotesData: {}, showDeleteModal: false,
                      showInsertModal: false
                    });
      window.location.reload();
    }

    render() {
      if (this.state.isLoading){
        return (
          <div>
            Loading...
          </div>
        );
      }

      return (
      <div className="grid lg:grid-cols-3 grid-cols-1 text-center">
      <div className="m-3 p-4 w-full max-w-screen-lg container col-span-2 lg:border-r-2 border-secondary">
          <div className="main-text mb-4">Quotes</div>
          <div className="m-4">
            <button className="square-btn" onClick={this.openInsertModal}>Add Quotes</button>
            <InsertQuotesModal showModal={this.state.showInsertModal} closeModal={this.closeModal} />
            <DeleteQuotesModal deleteQuotesData={this.state.deleteQuotesData} showModal={this.state.showDeleteModal} closeModal={this.closeModal} />
            <EditQuotesModal editQuotesData={this.state.editQuotesData} showModal={this.state.showEditModal} closeModal={this.closeModal} />
          </div>
          {
            (this.state.quotesdata.hasOwnProperty("message") ||
              this.state.quotesdata.hasOwnProperty("error"))
            ? <ApiResponse response={this.state.quotesdata}/>
            : <div className="flex flex-col space-y-8 m-8">
              {
                this.state.quotesdata.map(
                  (quote,i) => (
                  <div className="grid gap-y-2 border-4 rounded-xl border-primary p-4" key={i}>
                    <div className="content-text">{quote.quote}</div>
                    <div className="author-text">- {quote.author}</div>
                    <div>
                      
                    <Tags tags={quote.tags} />
                    </div>
                    <div className="flex flex-row gap-2 justify-end">
                    <button className="green-btn" onClick={() => this.openEditModal(quote)}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      Edit
                    </button>
                    
                    <button className="red-btn" onClick={() => this.openDeleteModal(quote)}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Delete
                    </button>
                    </div>
                  </div>
                  
                ))
              }
              </div>
        }
        </div>
        
        <AllTags allTags={this.state.allTags} />
      </div>
      );
  }
}

export default Quote;
