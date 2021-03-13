import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';

import Tags from './tags.jsx';
import AllTags from './allTags.jsx';

class Quote extends React.Component { 
    _isMounted = false;

    constructor(){
      super();
      this.state = { isLoading : true, redirect: false, quotesdata : [], allTags : [] };
      this.fetchQuotesTags = this.fetchQuotesTags.bind(this);
    }
    
    async fetchQuotesTags(userData) {
      this._isMounted = true;
      const q = await fetch(this.baseURL + 'fetchQuotes.php?uid=' + this.uid);
      const qjsonData = await q.json();
      console.log(qjsonData);
      const t = await fetch(this.baseURL + 'fetchTags.php?uid=' + this.uid);
      const tjsonData = await t.json();
      
      if(this._isMounted === true)
      {
      this.setState({ isLoading : false, quotesdata : qjsonData, allTags : tjsonData });
      } 
    }

    componentDidMount(){
      const userData = localStorage.getItem('userData');
      if(userData){
        this.fetchQuotesTags(userData); 
      }
      else{
        this.setState({redirect: true});
      }
    }
    
    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      // if(this.state.redirect){
      //   return(
      //     <Redirect to={'/login'} />
      //   );
      // }

      if (this.state.isLoading){
        return (
          <div>Loading...</div>
        );
      }
        // console.log(allTags);
      if(this.state.quotesdata.hasOwnProperty('Error') || this.state.allTags.hasOwnProperty('Message') ){
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
