import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import Auth from '../services/auth';
import PostData from '../services/postData';

import Tags from './tags.jsx';
import AllTags from './allTags.jsx';

class Quote extends React.Component { 
    _isMounted = false;

    constructor(){
      super();
      this.state = { isLoading : false, redirect: false, quotesdata : [], allTags : [] };
    }
    
    async componentDidMount() {
      this._isMounted = true;
      if(Auth.isAuthenticated()){
        const token = Auth.getLocalData();
        const qjsonData = await PostData('fetchQuotes.php', token.token , token);
        const tjsonData = await PostData('fetchTags.php', token.token , token);
        
        if(this._isMounted === true)
        {
        this.setState({ isLoading : false, quotesdata : qjsonData, allTags : tjsonData });
        } 

      }
      
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      if(this.state.redirect){
        return(
          <Redirect to={'/login'} />
        );
      }

      if (this.state.isLoading){
        return (
          <div>Loading...</div>
        );
      }
        // console.log(allTags);
      if(this.state.quotesdata.hasOwnProperty('Error') || this.state.quotesdata.hasOwnProperty('Message') ){
        return(
          <h2>"Oops! Some error Occured! Try again after sometime"</h2>
        );
      }
      return (
      <div>
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
  
  ReactDOM.render(
    <Quote />,
    document.getElementById('root')
  );

  export default Quote;
