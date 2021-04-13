import React from 'react';
import Nav from '../common/nav';
import Auth from '../services/auth';
import PostData from '../services/postData';
import Tags from './tags.jsx';
import AllTags from './allTags.jsx';
import InsertQuotesModal from './insertQuotes';
import DeleteQuotesModal from './deleteQuotes';

class Quote extends React.Component { 
    _isMounted = false;

    constructor(props){
      super(props);
      this.state = {  isLoading : false, 
                      quotesdata : [], 
                      allTags : [] , 
                      showInsertModal: false,
                      deleteQuotesData: {}
                    };
      this.openInsertModal = this.openInsertModal.bind(this);
      this.closeInsertModal = this.closeInsertModal.bind(this);
      this.openDeleteModal = this.openDeleteModal.bind(this);
      this.closeDeleteModal = this.closeDeleteModal.bind(this);
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

    closeInsertModal () {
      this.setState({ showInsertModal: false });
      window.location.reload();
    }

    openDeleteModal (quotesData) {
      this.setState({ deleteQuotesData: quotesData,  showDeleteModal: true });
    }

    closeDeleteModal () {
      this.setState({ editQuotesData: {}, showDeleteModal: false });
      window.location.reload();
    }

    openEditModal (quotesData) {
      this.setState({ editQuotesData: quotesData,  showDeleteModal: true });
    }

    closeEditModal () {
      this.setState({ deleteQuotesData: {}, showDeleteModal: false });
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
        // console.log(allTags);
      if(this.state.quotesdata.hasOwnProperty('error')){
        return(
          <div>
            <Nav />
            <h2>"Oops! Some error Occured! Try again after sometime"</h2>
          </div>

        );
      }
      if(this.state.quotesdata.hasOwnProperty('message') ){
        return(
          <div>
            <Nav />
            <h2>{this.state.quotesdata.message}</h2>
          </div>

        );
      }
      return (
      <div>
        <Nav />
        <h1> Quotes Page </h1>
        <div>
          <button onClick={this.openInsertModal}>Insert Quotes</button>
          <InsertQuotesModal showModal={this.state.showInsertModal} closeModal={this.closeInsertModal} />
          <DeleteQuotesModal deleteQuotesData={this.state.deleteQuotesData} showModal={this.state.showDeleteModal} closeModal={this.closeDeleteModal} />
          <EditQuotesModal editQuotesData={this.state.editQuotesData} showModal={this.state.showEditModal} closeModal={this.closeEditModal} />
        </div>
        {
          this.state.quotesdata.map(
            (quote,i) => (
              <div key={i}>
              <h3>{quote.quote}</h3>
              <h5>{quote.author}</h5>
              <Tags tags={quote.tags} />
              <button onClick={() => this.openDeleteModal(quote)}>Delete button</button>
              </div>
            )
          )
        }
        <hr></hr>
        <AllTags allTags={this.state.allTags} />
      </div>
      );
  }
}

export default Quote;
