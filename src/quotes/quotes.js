import React from 'react';
import Nav from '../common/nav';
import Auth from '../services/auth';
import PostData from '../services/postData';

import Tags from './tags.jsx';
import AllTags from './allTags.jsx';

class Quote extends React.Component { 
    _isMounted = false;

    constructor(props){
      super(props);
      this.state = { isLoading : false, quotesdata : [], allTags : [] };
      this.redirectFunction.bind(this);
    }
    
    async componentDidMount() {
      this._isMounted = true;
      if(Auth.isAuthenticated()){
        const userData = Auth.getLocalData();
        const token = userData.token;
        delete userData.token;
        const qjsonData = await PostData('Quotes/fetchQuotes.php', token, userData);
        const tjsonData = await PostData('Tags/fetchTags.php', token, userData);
        
        if(this._isMounted === true)
        {
        this.setState({ isLoading : false, quotesdata : qjsonData, allTags : tjsonData });
        } 
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    redirectFunction(){
      if(!Auth.isAuthenticated() && this.props.history !== undefined){
        this.props.history.push("/login");
      }
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
        <Nav redirectfn = {this.redirectFunction} />
        <h1> Quotes Page </h1>
        {
          this.state.quotesdata.map(
            (quote,i) => (
              <div key={i}>
              <h3>{quote.quote}</h3>
              <h5>{quote.author}</h5>
              <Tags tags={quote.tags} />
              </div>
            )
          )
        }
        <AllTags allTags={this.state.allTags} />
      </div>
      );
  }
}

export default Quote;
