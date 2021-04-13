import React from 'react';
import Nav from '../common/nav';
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
            <Nav />
            Loading...
          </div>
        );
      }

      return (
      <div>
        <Nav />
        <h1> Quotes Page </h1>
        <div>
          <button onClick={this.openInsertModal}>Insert Quotes</button>
          <InsertQuotesModal showModal={this.state.showInsertModal} closeModal={this.closeModal} />
          <DeleteQuotesModal deleteQuotesData={this.state.deleteQuotesData} showModal={this.state.showDeleteModal} closeModal={this.closeModal} />
          <EditQuotesModal editQuotesData={this.state.editQuotesData} showModal={this.state.showEditModal} closeModal={this.closeModal} />
        </div>
        {
          (this.state.quotesdata.hasOwnProperty("message") ||
            this.state.quotesdata.hasOwnProperty("error"))
          ? <ApiResponse response={this.state.quotesdata}/>
          : <div>
            {
              this.state.quotesdata.map(
                (quote,i) => (
                <div key={i}>
                  <h3>{quote.quote}</h3>
                  <h5>{quote.author}</h5>
                  <Tags tags={quote.tags} />
                  <button onClick={() => this.openDeleteModal(quote)}>Delete button</button>
                  <button onClick={() => this.openEditModal(quote)}>Edit button</button>
                </div>
                
              ))
            }
              <hr></hr>
              <AllTags allTags={this.state.allTags} />
            </div>
        }
      </div>
      );
  }
}

export default Quote;
